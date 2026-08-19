const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(request, response) {
  if (request.method !== "POST") return response.status(405).json({ message: "Method not allowed." });
  const body = request.body || {};
  if (body.website) return response.status(200).json({ ok: true });
  if (!body.fullName || !emailPattern.test(String(body.email || "")) || !body.message || body.privacyConsent !== "on") {
    return response.status(400).json({ message: "Please complete the required fields." });
  }
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "consult@cfoaccounting.co.uk";
  const from = process.env.CONTACT_FROM_EMAIL || "CFO Accounting Website <onboarding@resend.dev>";
  if (!apiKey) return response.status(503).json({ message: "Email delivery is not configured yet." });

  const fields = [
    ["Name", body.fullName], ["Company", body.companyName], ["Email", body.email],
    ["Phone", body.phone], ["Service", body.service], ["Message", body.message]
  ];
  const html = fields.map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value || "-")}</p>`).join("");
  const result = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], reply_to: body.email, subject: `Website enquiry from ${body.fullName}`, html })
  });
  if (!result.ok) return response.status(502).json({ message: "Email delivery failed." });
  return response.status(200).json({ ok: true });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}
