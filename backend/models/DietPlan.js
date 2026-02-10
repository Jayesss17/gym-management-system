const mongoose = require("mongoose");

const DietPlanSchema = new mongoose.Schema({
  memberId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Member" 
  },
  dietType: { 
    type: String,  // Veg or Non-Veg
  },
  weeklyPlan: { 
    type: String  // Full week diet text
  },
  calories: { 
    type: Number 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("DietPlan", DietPlanSchema);
