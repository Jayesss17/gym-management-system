const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true
  },
  status: {
    type: String,
    default: "Present"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
