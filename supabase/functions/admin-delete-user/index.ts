import { cors, requireAdmin } from "../_shared/admin.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  try {
    const { supa, userId: adminId } = await requireAdmin(req);
    const body = await req.json();
    const userId = typeof body?.user_id === "string" ? body.user_id.trim() : "";

    if (!userId) throw new Error("user_id is required");
    if (userId === adminId) throw new Error("The active administrator cannot be deleted");

    const { data: roles, error: roleError } = await supa
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    if (roleError) throw new Error(roleError.message);
    if (roles?.some((entry: { role: string }) => entry.role === "admin")) {
      throw new Error("Administrator accounts cannot be deleted here");
    }

    const { error } = await supa.auth.admin.deleteUser(userId);
    if (error) throw new Error(error.message);

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...cors, "content-type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Delete failed";
    const status = message === "Unauthorized" ? 401 : message === "Forbidden" ? 403 : 400;
    return new Response(JSON.stringify({ error: message }), {
      status,
      headers: { ...cors, "content-type": "application/json" },
    });
  }
});