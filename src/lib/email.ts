import { Resend } from "resend";

const NOTIFY_EMAIL = "myctalgos@gmail.com";

export async function sendNotificationEmail(subject: string, html: string) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set, skipping email notification");
    return;
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "MYCTAlgos <onboarding@resend.dev>",
      to: NOTIFY_EMAIL,
      subject,
      html,
    });
  } catch (error) {
    console.error("Failed to send notification email:", error);
  }
}
