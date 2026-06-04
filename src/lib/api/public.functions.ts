import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// ============================================================================
// PUBLIC SERVER FUNCTIONS — no auth required
// ============================================================================

export const getAgentInfo = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin.from("agent_settings").select("name, contact").eq("id", 1).single();
  return data ?? { name: "Course Agent", contact: "+0000000000" };
});

export const getPricing = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin.from("pricing_settings").select("individual_price, group_price").eq("id", 1).single();
  return data ?? { individual_price: 5, group_price: 8 };
});

export const getSystemSettings = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin.from("system_settings").select("app_name, support_email, screenshot_protection").eq("id", 1).single();
  return data ?? { app_name: "Power Electronics 1", support_email: "powerelectronics1@gmail.com", screenshot_protection: true };
});

const RequestSchema = z.object({
  full_name: z.string().trim().min(2).max(100),
  whatsapp: z.string().trim().min(6).max(30).regex(/^[+\d\s\-()]+$/, "Invalid WhatsApp number"),
});

export const submitAccessRequest = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => RequestSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("access_requests").insert({
      full_name: data.full_name,
      whatsapp: data.whatsapp,
    });
    if (error) throw new Error("Could not submit request. Please try again.");
    return { ok: true };
  });

const SignInSchema = z.object({
  full_name: z.string().trim().min(2).max(100),
  access_code: z.string().trim().min(4).max(40),
  remember: z.boolean().default(false),
});

function randomToken(bytes = 32): string {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}

export const userSignIn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => SignInSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const code = data.access_code.trim().toUpperCase();
    const { data: req } = await supabaseAdmin
      .from("access_requests")
      .select("id, full_name, whatsapp, status, access_code")
      .eq("access_code", code)
      .maybeSingle();
    if (!req || req.status !== "approved") {
      throw new Error("Invalid access code.");
    }
    if (req.full_name.trim().toLowerCase() !== data.full_name.trim().toLowerCase()) {
      throw new Error("Full name does not match the name on file.");
    }
    const token = randomToken();
    const expires = new Date(Date.now() + (data.remember ? 30 : 1) * 24 * 60 * 60 * 1000);

    // Upsert app_user row
    const { data: existing } = await supabaseAdmin
      .from("app_users")
      .select("id, banned")
      .eq("access_code", code)
      .maybeSingle();

    if (existing?.banned) throw new Error("This account has been disabled. Contact support.");

    let userId: string;
    if (existing) {
      userId = existing.id;
      await supabaseAdmin
        .from("app_users")
        .update({
          session_token: token,
          session_expires_at: expires.toISOString(),
          last_login: new Date().toISOString(),
          full_name: req.full_name,
          whatsapp: req.whatsapp,
        })
        .eq("id", userId);
    } else {
      const { data: ins, error } = await supabaseAdmin
        .from("app_users")
        .insert({
          full_name: req.full_name,
          whatsapp: req.whatsapp,
          access_code: code,
          session_token: token,
          session_expires_at: expires.toISOString(),
          last_login: new Date().toISOString(),
        })
        .select("id")
        .single();
      if (error || !ins) throw new Error("Could not start session.");
      userId = ins.id;
    }

    return {
      token,
      user: {
        id: userId,
        full_name: req.full_name,
        whatsapp: req.whatsapp,
        access_code: code,
      },
    };
  });

// Used to validate a session in subsequent calls (called from loaders if needed)
export const validateUserToken = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ token: z.string().min(10) }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: u } = await supabaseAdmin
      .from("app_users")
      .select("id, full_name, whatsapp, access_code, banned, session_expires_at")
      .eq("session_token", data.token)
      .maybeSingle();
    if (!u || u.banned) return null;
    if (u.session_expires_at && new Date(u.session_expires_at) < new Date()) return null;
    return { id: u.id, full_name: u.full_name, whatsapp: u.whatsapp, access_code: u.access_code };
  });

// Preview cards (first N of first topic, no auth)
export const getPreviewCards = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data: topic } = await supabaseAdmin
    .from("topics")
    .select("id, name, free_preview_limit")
    .order("order_index", { ascending: true })
    .limit(1)
    .maybeSingle();
  if (!topic) return { topic: null, cards: [] };
  const limit = topic.free_preview_limit ?? 5;
  const { data: cards } = await supabaseAdmin
    .from("cards")
    .select("id, question, answer, difficulty")
    .eq("topic_id", topic.id)
    .order("order_index", { ascending: true })
    .limit(limit);
  return { topic: { id: topic.id, name: topic.name }, cards: cards ?? [] };
});
