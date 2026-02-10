const Trainer = require("../models/Trainer");

exports.addTrainer = async (req, res) => {
  try {
    const trainer = new Trainer(req.body);
    await trainer.save();
    res.status(201).json(trainer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.json(trainers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTrainer = async (req, res) => {
  try {
    await Trainer.findByIdAndDelete(req.params.id);
    res.json({ message: "Trainer deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
