const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: "FitnessHub <no-reply@fitnesshub.com>",
      to,
      subject,
      text
    });

    console.log("Email sent to:", to);
  } catch (err) {
    // 🔐 NEVER crash the app because of email
    console.log("Email error (ignored):", err.message);
  }
};

module.exports = sendEmail;