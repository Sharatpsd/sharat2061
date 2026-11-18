export type ContactPayload = { name: string; email: string; subject: string; message: string };

// EmailJS public client credentials from the previous portfolio. These are
// designed to be public (they only allow sending through the configured template).
const EMAILJS = { service: "service_36l8axo", template: "template_lel4b1s", publicKey: "Cf-zIloKJIH6GQixV" };

async function viaNetlifyForms(p: ContactPayload) {
  const body = new URLSearchParams({ "form-name": "contact", "bot-field": "", ...p });
  const res = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  if (!res.ok) throw new Error(`Netlify Forms responded ${res.status}`);
}

async function viaEmailJs(p: ContactPayload) {
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: EMAILJS.service,
      template_id: EMAILJS.template,
      user_id: EMAILJS.publicKey,
      template_params: {
        from_name: p.name,
        from_email: p.email,
        reply_to: p.email,
        subject: p.subject,
        message: p.message,
        to_name: "Sharat Acharja Mugdho",
      },
    }),
  });
  if (!res.ok) throw new Error(`EmailJS responded ${res.status}`);
}

/**
 * Delivers a contact message. Netlify Forms is the primary channel (stored in the
 * Netlify dashboard with email notifications); EmailJS is a fallback. Throws if
 * neither channel accepts the message so the UI can offer a direct email link.
 */
export async function sendMessage(p: ContactPayload) {
  try {
    await viaNetlifyForms(p);
    return "netlify" as const;
  } catch (primary) {
    try {
      await viaEmailJs(p);
      return "emailjs" as const;
    } catch (fallback) {
      console.warn("Contact delivery failed", primary, fallback);
      throw fallback;
    }
  }
}
