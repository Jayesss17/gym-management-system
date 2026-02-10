const router = require("express").Router();
const Member = require("../models/Member");
const transporter = require("../config/email");

// Send Reminder Emails
router.post("/send-reminders", async (req, res) => {
  try {
    // Today's date
    const today = new Date();

    // Date after 3 days
    const reminderDate = new Date();
    reminderDate.setDate(today.getDate() + 3);

    // Find members whose membershipEndDate <= reminderDate
    const members = await Member.find({
      membershipEndDate: { $lte: reminderDate }
    });

    // Send email to each
    for (let member of members) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: member.email,
        subject: "Gym Membership Expiry Reminder",
        text: `Hello ${member.name}, your gym membership is about to expire on ${member.membershipEndDate.toDateString()}. Please renew it soon.`
      });
    }

    res.json({ message: "Reminder emails sent successfully" });

  } catch (err) {
    console.log("Reminder Error:", err.message);
    res.status(500).json({ message: "Failed to send reminders" });
  }
});

module.exports = router;
