const express = require("express");
const sendEmail = require("../config/mailer");

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, phone, tour, startDate, guests, notes } = req.body;

  const subject = `New Booking from ${name}`;
  const html = `
    <h2>New Booking Request</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Tour:</strong> ${tour}</p>
    <p><strong>Start Date:</strong> ${startDate}</p>
    <p><strong>Guests:</strong> ${guests}</p>
    <p><strong>Notes:</strong> ${notes || "None"}</p>
  `;

  try {
    await sendEmail(subject, html);
    res.status(200).json({ message: "Booking sent successfully" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: "Failed to send booking" });
  }
});

module.exports = router;
