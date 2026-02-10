const router = require("express").Router();
const Member = require("../models/Member");
const Trainer = require("../models/Trainer");
const Payment = require("../models/Payment");
const Attendance = require("../models/Attendance");

// Dashboard Stats
router.get("/stats", async (req, res) => {
  try {
    const totalMembers = await Member.countDocuments();
    const totalTrainers = await Trainer.countDocuments();
    const totalPayments = await Payment.countDocuments();

    // Today's attendance
    const today = new Date().toISOString().split("T")[0];
    const todayAttendance = await Attendance.countDocuments({ date: today });

    // Monthly payment counts (simple)
    const monthlyPayments = await Payment.aggregate([
      {
        $group: {
          _id: { $month: "$date" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.json({
      totalMembers,
      totalTrainers,
      totalPayments,
      todayAttendance,
      monthlyPayments
    });

  } catch (err) {
    console.log("Dashboard Error:", err.message);
    res.status(500).json({ message: "Dashboard stats error" });
  }
});

module.exports = router;
