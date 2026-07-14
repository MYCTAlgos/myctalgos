import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendNotificationEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { error } = await supabase
    .from("contact_submissions")
    .insert({ name, email, message });

  if (error) {
    console.error("Failed to save contact submission:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }

  await sendNotificationEmail(
    `New contact form submission from ${name}`,
    `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
  );

  return NextResponse.json({ ok: true });
}
