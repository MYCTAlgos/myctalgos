import { Resend } from "resend";

const NOTIFY_EMAIL = "myctalgos@gmail.com";
const FROM = "MYCTAlgos <onboarding@resend.dev>";

export async function sendNotificationEmail(subject: string, html: string) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set, skipping email notification");
    return;
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM,
      to: NOTIFY_EMAIL,
      subject,
      html,
    });
    if (error) {
      console.error("Failed to send notification email:", error);
    }
  } catch (error) {
    console.error("Failed to send notification email:", error);
  }
}

export async function sendConfirmationEmail(
  to: string,
  name: string,
  formType: "contact" | "discovery"
) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set, skipping confirmation email");
    return;
  }

  const firstName = name.split(" ")[0];
  const bodyLine =
    formType === "discovery"
      ? "Thanks for telling us about your business. We're reviewing your Discovery form now, and we'll be in touch soon to schedule a time to talk."
      : "Thanks for reaching out. We've received your message and will review it shortly.";

  const html = `
    <div style="font-family: sans-serif; color: #0b1220; max-width: 480px; margin: 0 auto;">
      <p>Hi ${firstName},</p>
      <p>${bodyLine}</p>
      <p>Talk soon,<br/>Mike &amp; Yadley<br/>MYCTAlgos</p>
    </div>
  `;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM,
      to,
      subject: "We got your message — MYCTAlgos",
      html,
    });
    if (error) {
      console.error("Failed to send confirmation email:", error);
    }
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
  }
}
