const nodemailer = require("nodemailer");

module.exports = async function handler(req, res) {
  // CORS 허용 (imec-hr.html 호출용)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { to, cc, subject, html } = req.body;
  if (!to || !to.length || !subject || !html) {
    return res.status(400).json({ error: "Missing required fields: to, subject, html" });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,       // smtp.mailplug.co.kr
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,                       // SSL (465)
    auth: {
      user: process.env.SMTP_USER,     // hr@imecs.co.kr
      pass: process.env.SMTP_PASS,     // 이메일 비밀번호
    },
    tls: { rejectUnauthorized: false },
  });

  try {
    await transporter.sendMail({
      from: `"IMEC HR" <${process.env.SMTP_USER}>`,
      to: Array.isArray(to) ? to.join(",") : to,
      cc: cc && cc.length ? (Array.isArray(cc) ? cc.join(",") : cc) : undefined,
      subject,
      html,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Email send error:", err.message);
    return res.status(500).json({ error: err.message });
  }
};
