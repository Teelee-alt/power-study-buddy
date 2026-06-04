import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

// Admin guard: middleware verifies Supabase auth, then we check the role.
async function assertAdmin(userId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
  if (!data) throw new Error("Forbidden: admin only");
}

function generateAccessCode(): string {
  const part = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let s = "";
    const arr = new Uint8Array(4);
    crypto.getRandomValues(arr);
    for (const n of arr) s += chars[n % chars.length];
    return s;
  };
  return `PE1-${part()}-${part()}`;
}

export const adminCheck = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
    return { isAdmin: !!data };
  });

// --- Access requests
export const adminListRequests = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin
      .from("access_requests")
      .select("id, full_name, whatsapp, status, access_code, approved_at, created_at")
      .order("created_at", { ascending: false });
    return data ?? [];
  });

export const adminApproveRequest = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    // Try a few codes to avoid collisions
    for (let i = 0; i < 5; i++) {
      const code = generateAccessCode();
      const { error } = await supabaseAdmin
        .from("access_requests")
        .update({ status: "approved", access_code: code, approved_at: new Date().toISOString() })
        .eq("id", data.id)
        .eq("status", "pending");
      if (!error) return { code };
    }
    throw new Error("Could not generate unique code.");
  });

export const adminRejectRequest = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("access_requests").update({ status: "rejected" }).eq("id", data.id);
    return { ok: true };
  });

// --- Codes
export const adminListCodes = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin
      .from("access_requests")
      .select("id, full_name, whatsapp, access_code, approved_at, status")
      .not("access_code", "is", null)
      .order("approved_at", { ascending: false });
    const { data: users } = await supabaseAdmin
      .from("app_users")
      .select("access_code, last_login, banned");
    const usage = new Map(users?.map((u) => [u.access_code, u]) ?? []);
    return (data ?? []).map((c) => ({
      ...c,
      used: usage.has(c.access_code ?? ""),
      last_login: usage.get(c.access_code ?? "")?.last_login ?? null,
    }));
  });

// --- Agent
export const adminUpdateAgent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ name: z.string().trim().min(1).max(100), contact: z.string().trim().min(3).max(60) }).parse(d))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("agent_settings").update({ name: data.name, contact: data.contact, updated_at: new Date().toISOString() }).eq("id", 1);
    return { ok: true };
  });

// --- Pricing
export const adminUpdatePricing = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ individual_price: z.number().min(0).max(10000), group_price: z.number().min(0).max(10000) }).parse(d))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("pricing_settings").update({ individual_price: data.individual_price, group_price: data.group_price, updated_at: new Date().toISOString() }).eq("id", 1);
    return { ok: true };
  });

// --- Users
export const adminListUsers = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin
      .from("app_users")
      .select("id, full_name, whatsapp, access_code, last_login, banned, created_at")
      .order("created_at", { ascending: false });
    return data ?? [];
  });

export const adminSetUserBan = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid(), banned: z.boolean() }).parse(d))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const update: { banned: boolean; session_token: string | null; session_expires_at: string | null } = {
      banned: data.banned,
      session_token: null,
      session_expires_at: null,
    };
    await supabaseAdmin.from("app_users").update(update).eq("id", data.id);
    return { ok: true };
  });

// --- Tickets
export const adminListTickets = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin
      .from("support_tickets")
      .select("id, user_full_name, user_whatsapp, subject, message, status, admin_response, created_at, responded_at")
      .order("created_at", { ascending: false });
    return data ?? [];
  });

export const adminReplyTicket = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid(), response: z.string().trim().min(1).max(4000) }).parse(d))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("support_tickets").update({
      admin_response: data.response,
      status: "closed",
      responded_at: new Date().toISOString(),
    }).eq("id", data.id);
    return { ok: true };
  });

export const adminDeleteTicket = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("support_tickets").delete().eq("id", data.id);
    return { ok: true };
  });

// --- Topics & Cards
export const adminListTopics = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin.from("topics").select("id, name, description, order_index, free_preview_limit").order("order_index");
    return data ?? [];
  });

export const adminUpsertTopic = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({
    id: z.string().uuid().optional(),
    name: z.string().trim().min(1).max(120),
    description: z.string().max(500).optional(),
    order_index: z.number().int().min(0).max(9999),
  }).parse(d))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    if (data.id) {
      await supabaseAdmin.from("topics").update({ name: data.name, description: data.description ?? null, order_index: data.order_index }).eq("id", data.id);
    } else {
      await supabaseAdmin.from("topics").insert({ name: data.name, description: data.description ?? null, order_index: data.order_index });
    }
    return { ok: true };
  });

export const adminDeleteTopic = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("topics").delete().eq("id", data.id);
    return { ok: true };
  });

export const adminListCards = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ topic_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: cards } = await supabaseAdmin.from("cards").select("id, question, answer, difficulty, order_index").eq("topic_id", data.topic_id).order("order_index");
    return cards ?? [];
  });

export const adminUpsertCard = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({
    id: z.string().uuid().optional(),
    topic_id: z.string().uuid(),
    question: z.string().trim().min(2).max(4000),
    answer: z.string().trim().min(2).max(8000),
    difficulty: z.enum(["easy", "medium", "hard"]),
    order_index: z.number().int().min(0).max(99999),
  }).parse(d))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    if (data.id) {
      await supabaseAdmin.from("cards").update({
        topic_id: data.topic_id, question: data.question, answer: data.answer, difficulty: data.difficulty, order_index: data.order_index,
      }).eq("id", data.id);
    } else {
      await supabaseAdmin.from("cards").insert({
        topic_id: data.topic_id, question: data.question, answer: data.answer, difficulty: data.difficulty, order_index: data.order_index,
      });
    }
    return { ok: true };
  });

export const adminDeleteCard = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("cards").delete().eq("id", data.id);
    return { ok: true };
  });

// --- System
export const adminUpdateSystem = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({
    app_name: z.string().trim().min(1).max(120),
    support_email: z.string().email().max(120),
    screenshot_protection: z.boolean(),
    callmebot_url: z.string().max(500).optional().nullable(),
  }).parse(d))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("system_settings").update({
      app_name: data.app_name,
      support_email: data.support_email,
      screenshot_protection: data.screenshot_protection,
      callmebot_url: data.callmebot_url || null,
      updated_at: new Date().toISOString(),
    }).eq("id", 1);
    return { ok: true };
  });

// --- Seed initial content
export const adminSeedInitialContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { INITIAL_TOPICS } = await import("@/lib/seed/initial");

    let topicsCreated = 0;
    let cardsCreated = 0;
    for (const [idx, t] of INITIAL_TOPICS.entries()) {
      const { data: existing } = await supabaseAdmin.from("topics").select("id").eq("name", t.name).maybeSingle();
      let topicId = existing?.id;
      if (!topicId) {
        const { data: ins } = await supabaseAdmin.from("topics").insert({
          name: t.name, description: t.description, order_index: idx, free_preview_limit: 5,
        }).select("id").single();
        topicId = ins?.id;
        topicsCreated++;
      }
      if (!topicId) continue;
      // Only seed cards if topic has none
      const { count } = await supabaseAdmin.from("cards").select("*", { count: "exact", head: true }).eq("topic_id", topicId);
      if ((count ?? 0) > 0) continue;
      const rows = t.cards.map((c, i) => ({
        topic_id: topicId,
        question: c.q,
        answer: c.a,
        difficulty: c.d,
        order_index: i,
      }));
      if (rows.length) {
        const { error } = await supabaseAdmin.from("cards").insert(rows);
        if (!error) cardsCreated += rows.length;
      }
    }
    return { topicsCreated, cardsCreated };
  });

// --- Grant self admin (used once during initial setup, called via a guarded route)
export const grantSelfAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    // Only allow if there are no admins yet
    const { count } = await supabaseAdmin.from("user_roles").select("*", { count: "exact", head: true }).eq("role", "admin");
    if ((count ?? 0) > 0) throw new Error("An admin already exists. Ask an existing admin to grant access.");
    await supabaseAdmin.from("user_roles").insert({ user_id: context.userId, role: "admin" });
    return { ok: true };
  });
