const express = require("express");
const sendEmail = require("../config/mailer");

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  const subject = `New Contact Message from ${name}`;
  const html = `
    <h2>New Contact Message</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong> ${message}</p>
  `;

  try {
    await sendEmail(subject, html);
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

module.exports = router;
