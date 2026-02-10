const Payment = require("../models/Payment");
const Member = require("../models/Member");
const sendEmail = require("../utils/sendEmail");

/* =========================
   Get all payments
========================= */
const getPayments = async (req, res) => {
  try {
    // Populate memberId to get member details
    const payments = await Payment.find().populate("memberId");
    res.json(payments);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* =========================
   Add new payment
========================= */
const addPayment = async (req, res) => {
  try {
    const { memberId, amount, method } = req.body;

    // 1️⃣ Validate member exists
    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json("Member not found");
    }

    // 2️⃣ Save payment (CORE FEATURE)
    const payment = new Payment({
      memberId,
      amount,
      method
    });

    await payment.save();

    // 3️⃣ Send response FIRST (important for safety)
    res.status(201).json(payment);

    // 4️⃣ Send email (SECONDARY, non-blocking)
    sendEmail(
      member.email,
      "Your Gym Plan Payment Details",
      `
Hello ${member.name},

Your gym payment has been successfully recorded.

Payment Details:
Amount Paid: ₹${amount}
Payment Method: ${method}
Payment Date: ${new Date().toLocaleDateString()}

Thank you for choosing FitnessHub.
Please renew your plan before expiry.

– FitnessHub Gym
`
    );

  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getPayments, addPayment };