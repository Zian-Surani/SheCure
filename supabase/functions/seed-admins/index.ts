import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceKey) {
      throw new Error("Missing Supabase environment variables");
    }

    const adminClient = createClient(supabaseUrl, serviceKey);

    const { users } = await req.json();
    if (!users || !Array.isArray(users)) {
      return new Response(JSON.stringify({ error: "Invalid payload" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const results: any[] = [];

    for (const u of users) {
      try {
        const { data: existing, error: getErr } = await adminClient.auth.admin.getUserByEmail(u.email);
        let userId: string | null = null;

        if (getErr && getErr.message && !getErr.message.includes("User not found")) {
          throw getErr;
        }

        if (existing?.user) {
          userId = existing.user.id;
        } else {
          const { data: created, error: createErr } = await adminClient.auth.admin.createUser({
            email: u.email,
            password: u.password,
            email_confirm: true,
          });
          if (createErr) throw createErr;
          userId = created.user?.id ?? null;
        }

        if (!userId) throw new Error("Failed to resolve user id");

        // Upsert admin role
        const { error: roleErr } = await adminClient
          .from("user_roles")
          .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });
        if (roleErr) throw roleErr;

        results.push({ email: u.email, status: "ok" });
      } catch (e: any) {
        results.push({ email: u.email, status: "error", message: e.message });
      }
    }

    return new Response(JSON.stringify({ results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
