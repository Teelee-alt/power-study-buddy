import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

async function requireUser(token: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data: u } = await supabaseAdmin
    .from("app_users")
    .select("id, full_name, whatsapp, access_code, banned, session_expires_at, last_login")
    .eq("session_token", token)
    .maybeSingle();
  if (!u || u.banned) throw new Error("Not signed in.");
  if (u.session_expires_at && new Date(u.session_expires_at) < new Date()) throw new Error("Session expired.");
  return u;
}

const TokenSchema = z.object({ token: z.string().min(10) });

export const getDashboardData = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => TokenSchema.parse(d))
  .handler(async ({ data }) => {
    await requireUser(data.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: topics } = await supabaseAdmin
      .from("topics")
      .select("id, name, description, order_index")
      .order("order_index", { ascending: true });
    const { data: counts } = await supabaseAdmin
      .from("cards")
      .select("topic_id, difficulty");
    const byTopic: Record<string, { total: number; easy: number; medium: number; hard: number }> = {};
    for (const c of counts ?? []) {
      const b = (byTopic[c.topic_id] ??= { total: 0, easy: 0, medium: 0, hard: 0 });
      b.total++;
      b[c.difficulty as "easy" | "medium" | "hard"]++;
    }
    return { topics: topics ?? [], counts: byTopic };
  });

export const getTopicCards = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => TokenSchema.extend({ topic_id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    await requireUser(data.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: topic } = await supabaseAdmin.from("topics").select("id, name").eq("id", data.topic_id).single();
    const { data: cards } = await supabaseAdmin
      .from("cards")
      .select("id, question, answer, difficulty, order_index")
      .eq("topic_id", data.topic_id)
      .order("order_index", { ascending: true });
    return { topic, cards: cards ?? [] };
  });

const TicketSchema = TokenSchema.extend({
  subject: z.string().trim().min(2).max(150),
  message: z.string().trim().min(2).max(2000),
});

export const submitTicket = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => TicketSchema.parse(d))
  .handler(async ({ data }) => {
    const u = await requireUser(data.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("support_tickets").insert({
      app_user_id: u.id,
      user_full_name: u.full_name,
      user_whatsapp: u.whatsapp,
      subject: data.subject,
      message: data.message,
    });
    if (error) throw new Error("Could not submit ticket.");

    // Callmebot Telegram notification (best-effort)
    try {
      const { data: sys } = await supabaseAdmin.from("system_settings").select("callmebot_url").eq("id", 1).single();
      if (sys?.callmebot_url) {
        const msg = `New support ticket from ${u.full_name}: ${data.subject}`;
        const url = sys.callmebot_url.includes("?")
          ? `${sys.callmebot_url}&text=${encodeURIComponent(msg)}`
          : `${sys.callmebot_url}?text=${encodeURIComponent(msg)}`;
        await fetch(url).catch(() => {});
      }
    } catch {}
    return { ok: true };
  });

export const getMyTickets = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => TokenSchema.parse(d))
  .handler(async ({ data }) => {
    const u = await requireUser(data.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: tickets } = await supabaseAdmin
      .from("support_tickets")
      .select("id, subject, message, status, admin_response, created_at, responded_at")
      .eq("app_user_id", u.id)
      .order("created_at", { ascending: false });
    return tickets ?? [];
  });

export const signOut = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => TokenSchema.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("app_users").update({ session_token: null, session_expires_at: null }).eq("session_token", data.token);
    return { ok: true };
  });
