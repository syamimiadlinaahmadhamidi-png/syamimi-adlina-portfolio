
require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");

const app = express();

const PORT = process.env.PORT || 3000;

// Allow local portfolio frontend
app.use(cors({
  origin: [
    "http://127.0.0.1:5500",
    "http://localhost:5500"
  ]
}));

app.use(express.json({ limit: "12kb" }));

// Limit repeated submissions
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false
});

// Gmail SMTP configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: Number(process.env.SMTP_PORT || 465) === 465,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },

  disableFileAccess: true,
  disableUrlAccess: true
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Portfolio backend is running!"
  });
});

// Contact form endpoint
app.post("/api/contact", contactLimiter, async (req, res) => {

  const { name, email, message } = req.body || {};

  // Validate inputs
  const valid =
    typeof name === "string" &&
    typeof email === "string" &&
    typeof message === "string" &&
    name.trim().length >= 2 &&
    name.length <= 80 &&
    email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    message.trim().length >= 3 &&
    message.length <= 3000;

  if (!valid) {
    return res.status(400).json({
      success: false,
      message: "Please enter valid contact details."
    });
  }

  if (
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS ||
    !process.env.CONTACT_EMAIL
  ) {
    return res.status(503).json({
      success: false,
      message: "Email service is not configured."
    });
  }

  try {

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL,
      replyTo: email.trim(),

      subject: `Portfolio Message from ${name.trim()}`,

      text: `
New Portfolio Message

Name: ${name.trim()}
Email: ${email.trim()}

Message:
${message.trim()}
      `
    });

    res.status(200).json({
      success: true,
      message: "Message sent successfully!"
    });

  } catch (error) {

    console.error("Email sending failed:", error.code);

    res.status(500).json({
      success: false,
      message: "Unable to send message. Please try again."
    });
  }

});


// Start backend
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
