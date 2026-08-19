export default async function handler(request, response) {
  if (request.method !== "POST") return response.status(405).json({ message: "Method not allowed." });
  const body = request.body || {};
  if (body.website) return response.status(200).json({ ok: true });
  if (!body.cbName || !body.cbPhone || body.privacyConsent !== "on") {
    return response.status(400).json({ message: "Please provide your name, phone number and consent." });
  }
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "consult@cfoaccounting.co.uk";
  const from = process.env.CONTACT_FROM_EMAIL || "CFO Accounting Website <onboarding@resend.dev>";
  if (!apiKey) return response.status(503).json({ message: "Callback delivery is not configured yet." });
  const result = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from, to: [to], subject: `Callback request from ${body.cbName}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(body.cbName)}</p><p><strong>Phone:</strong> ${escapeHtml(body.cbPhone)}</p>`
    })
  });
  if (!result.ok) return response.status(502).json({ message: "Callback delivery failed." });
  return response.status(200).json({ ok: true });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}
