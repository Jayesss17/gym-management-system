const router = require("express").Router();
const WorkoutPlan = require("../models/WorkoutPlan");

/* Get all workout plans */
router.get("/", async (req, res) => {
  try {
    const plans = await WorkoutPlan
      .find()
      .populate("memberId")
      .populate("trainerId");

    res.json(plans);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* Add workout plan */
router.post("/", async (req, res) => {
  try {
    const plan = new WorkoutPlan(req.body);
    await plan.save();
    res.json(plan);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
