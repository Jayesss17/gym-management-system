const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: String,
  phone: String,
  membership: String,

  // 🔥 new fields for reminder feature
  email: { type: String },
  membershipEndDate: { type: Date }
});

module.exports = mongoose.model("Member", memberSchema);
