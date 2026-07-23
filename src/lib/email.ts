import { Resend } from "resend";

const NOTIFY_EMAIL = "myctalgos@gmail.com";
const FROM = "MYCTAlgos <hello@myctalgos.com>";

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
      ? "Thanks for telling us about your business. We're reviewing your Discovery form now."
      : "Thanks for reaching out. We've received your message and are reviewing it now.";

  const steps =
    formType === "discovery"
      ? [
          "We're reviewing what you shared about your business.",
          "You'll get a Calendly email within the next day to pick a time for your first consultation.",
          "We'll sit down together, Mike, Yadley, and you, to talk through your goals and map out a plan built around your business.",
        ]
      : [
          "We're personally reading your message.",
          "You'll hear back from us within 1&ndash;2 business days.",
          "If it looks like a good fit, we'll send a Calendly email to schedule a quick call.",
        ];

  const stepsHtml = steps
    .map(
      (step, i) => `
        <tr>
          <td style="padding:0 12px 12px 0;vertical-align:top;width:24px;">
            <span style="display:inline-block;width:20px;height:20px;border-radius:50%;background:#1d4ed8;color:#ffffff;font-size:11px;font-weight:600;text-align:center;line-height:20px;">${i + 1}</span>
          </td>
          <td style="padding:0 0 12px 0;vertical-align:top;font-size:14px;line-height:1.6;color:#4b5468;">${step}</td>
        </tr>
      `
    )
    .join("");

  const html = `
    <div style="background:#f4f6fb;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
      <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e5ec;">
        <div style="background:#0b1220;padding:24px 32px;">
          <span style="color:#ffffff;font-size:18px;font-weight:600;letter-spacing:0.01em;">MYCTAlgos</span>
        </div>
        <div style="padding:32px;">
          <p style="margin:0 0 16px;font-size:16px;color:#0b1220;">Hi ${firstName},</p>
          <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#4b5468;">${bodyLine}</p>
          <div style="background:#f7f8fa;border-radius:12px;padding:20px 24px;margin:0 0 24px;">
            <p style="margin:0 0 14px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#2f6fed;">What happens next</p>
            <table role="presentation" style="border-collapse:collapse;">${stepsHtml}</table>
          </div>
          <p style="margin:0;font-size:15px;line-height:1.6;color:#4b5468;">Talk soon,<br/><strong style="color:#0b1220;">Mike &amp; Yadley</strong><br/>MYCTAlgos</p>
        </div>
        <div style="background:#f7f8fa;padding:16px 32px;border-top:1px solid #e2e5ec;">
          <p style="margin:0;font-size:12px;color:#6b7386;">MYCTAlgos &middot; Technology, Translated.</p>
        </div>
      </div>
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
