const mongoose = require("mongoose");

const TrainerSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  phone: String
});

module.exports = mongoose.model("Trainer", TrainerSchema);
