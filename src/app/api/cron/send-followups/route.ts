import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { sendCalendlyFollowupEmail } from "@/lib/email";

const DAY = 24 * 60 * 60 * 1000;

type FollowupTarget = {
  id: string;
  name: string;
  email: string;
};

async function processTable(
  supabase: ReturnType<typeof createSupabaseAdminClient>,
  table: "contact_submissions" | "discovery_submissions",
  windowStart: string,
  windowEnd: string
) {
  const { data, error } = await supabase
    .from(table)
    .select("id, name, email")
    .is("followup_sent_at", null)
    .gte("created_at", windowStart)
    .lte("created_at", windowEnd)
    .returns<FollowupTarget[]>();

  if (error) {
    console.error(`Failed to query ${table} for follow-ups:`, error);
    return { sent: 0, failed: 0 };
  }

  let sent = 0;
  let failed = 0;

  for (const row of data ?? []) {
    const result = await sendCalendlyFollowupEmail(row.email, row.name);
    if (result.ok) {
      const { error: updateError } = await supabase
        .from(table)
        .update({ followup_sent_at: new Date().toISOString() })
        .eq("id", row.id);
      if (updateError) {
        console.error(`Failed to mark ${table} ${row.id} as followed up:`, updateError);
        failed++;
      } else {
        sent++;
      }
    } else {
      failed++;
    }
  }

  return { sent, failed };
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = Date.now();
  const windowStart = new Date(now - 2 * DAY).toISOString();
  const windowEnd = new Date(now - 1 * DAY).toISOString();

  const supabase = createSupabaseAdminClient();

  const [contact, discovery] = await Promise.all([
    processTable(supabase, "contact_submissions", windowStart, windowEnd),
    processTable(supabase, "discovery_submissions", windowStart, windowEnd),
  ]);

  return NextResponse.json({
    ok: true,
    contact,
    discovery,
  });
}
