import { createClient } from "@supabase/supabase-js";

// Bypasses RLS entirely -- only ever use this in server-only code (cron
// routes, admin scripts), never anywhere reachable from the client.
export function createSupabaseAdminClient() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
