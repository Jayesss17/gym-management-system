const router = require("express").Router();
const Attendance = require("../models/Attendance");
const Member = require("../models/Member");

/* Get all attendance records */
router.get("/", async (req, res) => {
  try {
    const records = await Attendance.find().populate("memberId");
    res.json(records);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* Mark attendance */
router.post("/", async (req, res) => {
  try {
    const { memberId } = req.body;

    const record = new Attendance({
      memberId,
      status: "Present"
    });

    await record.save();
    res.json(record);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
