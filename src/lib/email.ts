import { Resend } from "resend";

const NOTIFY_EMAIL = "myctalgos@gmail.com";
const FROM = "MYCTAlgos <hello@myctalgos.com>";
const CALENDLY_URL = "https://calendly.com/myctalgos/30min";

function wrapEmail(bodyHtml: string) {
  return `
    <div style="background:#f4f6fb;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
      <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e5ec;">
        <div style="background:#0b1220;padding:24px 32px;">
          <span style="color:#ffffff;font-size:18px;font-weight:600;letter-spacing:0.01em;">MYCTAlgos</span>
        </div>
        <div style="padding:32px;">
          ${bodyHtml}
        </div>
        <div style="background:#f7f8fa;padding:16px 32px;border-top:1px solid #e2e5ec;">
          <p style="margin:0;font-size:12px;color:#6b7386;">MYCTAlgos &middot; Technology, Translated.</p>
        </div>
      </div>
    </div>
  `;
}

function stepsTable(steps: string[]) {
  const rows = steps
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
  return `<table role="presentation" style="border-collapse:collapse;">${rows}</table>`;
}

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

  const html = wrapEmail(`
    <p style="margin:0 0 16px;font-size:16px;color:#0b1220;">Hi ${firstName},</p>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#4b5468;">${bodyLine}</p>
    <div style="background:#f7f8fa;border-radius:12px;padding:20px 24px;margin:0 0 24px;">
      <p style="margin:0 0 14px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#2f6fed;">What happens next</p>
      ${stepsTable(steps)}
    </div>
    <p style="margin:0;font-size:15px;line-height:1.6;color:#4b5468;">Talk soon,<br/><strong style="color:#0b1220;">Mike &amp; Yadley</strong><br/>MYCTAlgos</p>
  `);

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

export async function sendCalendlyFollowupEmail(to: string, name: string) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set, skipping Calendly follow-up email");
    return { ok: false };
  }

  const firstName = name.split(" ")[0];

  const html = wrapEmail(`
    <p style="margin:0 0 16px;font-size:16px;color:#0b1220;">Hi ${firstName},</p>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#4b5468;">
      Ready when you are. Pick a time that works for you and we'll get your first
      consultation on the calendar, Mike, Yadley, and you, to talk through your
      goals and map out a plan built around your business.
    </p>
    <div style="text-align:center;margin:0 0 24px;">
      <a href="${CALENDLY_URL}" style="display:inline-block;background:linear-gradient(135deg,#1d4ed8,#4fc3f7);color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 28px;border-radius:999px;">
        Choose a time
      </a>
    </div>
    <p style="margin:0;font-size:15px;line-height:1.6;color:#4b5468;">Talk soon,<br/><strong style="color:#0b1220;">Mike &amp; Yadley</strong><br/>MYCTAlgos</p>
  `);

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM,
      to,
      subject: "Let's find a time to talk — MYCTAlgos",
      html,
    });
    if (error) {
      console.error("Failed to send Calendly follow-up email:", error);
      return { ok: false };
    }
    return { ok: true };
  } catch (error) {
    console.error("Failed to send Calendly follow-up email:", error);
    return { ok: false };
  }
}
