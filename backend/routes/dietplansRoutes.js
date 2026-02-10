const express = require("express");
const router = express.Router();
const DietPlan = require("../models/DietPlan");

// GET all diet plans
router.get("/", async (req, res) => {
  try {
    const plans = await DietPlan.find().populate("memberId", "name");
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new diet plan
router.post("/", async (req, res) => {
  try {
    const plan = new DietPlan(req.body);
    await plan.save();
    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
