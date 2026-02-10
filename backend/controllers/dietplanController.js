const DietPlan = require("../models/DietPlan");

exports.addDietPlan = async (req, res) => {
  try {
    const diet = new DietPlan(req.body);
    await diet.save();
    res.status(201).json(diet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDietPlans = async (req, res) => {
  try {
    const diets = await DietPlan.find();
    res.json(diets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
