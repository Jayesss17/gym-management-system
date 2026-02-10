const mongoose = require("mongoose");

const WorkoutPlanSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true
  },
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trainer",
    required: true
  },
  details: {
    type: String,
    required: true
  },
  startDate: Date,
  endDate: Date
});

module.exports = mongoose.model("WorkoutPlan", WorkoutPlanSchema);
