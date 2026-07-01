import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendNotificationEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    name,
    email,
    businessName,
    industry,
    businessType,
    yearsOperating,
    audience,
    interests,
    learnTopics,
    learnOther,
    buildServices,
    buildDetails,
    scaleFeatures,
    scaleOther,
    message,
  } = body;

  if (
    !name ||
    !email ||
    !businessName ||
    !industry ||
    !businessType ||
    !yearsOperating ||
    !audience ||
    !Array.isArray(interests) ||
    interests.length === 0
  ) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { error } = await supabase.from("discovery_submissions").insert({
    name,
    email,
    business_name: businessName,
    industry,
    business_type: businessType,
    years_operating: yearsOperating,
    audience,
    interests,
    learn_topics: learnTopics ?? null,
    learn_other: learnOther,
    build_services: buildServices ?? null,
    build_details: buildDetails,
    scale_features: scaleFeatures ?? null,
    scale_other: scaleOther,
    message,
  });

  if (error) {
    console.error("Failed to save discovery submission:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }

  await sendNotificationEmail(
    `New discovery form submission from ${name} (${businessName})`,
    `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Business:</strong> ${businessName}</p>
      <p><strong>Industry:</strong> ${industry}</p>
      <p><strong>Business Type:</strong> ${businessType}</p>
      <p><strong>Years Operating:</strong> ${yearsOperating}</p>
      <p><strong>Audience:</strong> ${audience}</p>
      <p><strong>Interested In:</strong> ${interests.join(", ")}</p>
      ${learnTopics?.length ? `<p><strong>Learn Topics:</strong> ${learnTopics.join(", ")}</p>` : ""}
      ${learnOther ? `<p><strong>Learn Other:</strong> ${learnOther}</p>` : ""}
      ${buildServices?.length ? `<p><strong>Build Services:</strong> ${buildServices.join(", ")}</p>` : ""}
      ${buildDetails ? `<p><strong>Build Details:</strong> ${buildDetails}</p>` : ""}
      ${scaleFeatures?.length ? `<p><strong>Scale Features:</strong> ${scaleFeatures.join(", ")}</p>` : ""}
      ${scaleOther ? `<p><strong>Scale Other:</strong> ${scaleOther}</p>` : ""}
      ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
    `
  );

  return NextResponse.json({ ok: true });
}
