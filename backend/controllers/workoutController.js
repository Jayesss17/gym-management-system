const WorkoutPlan = require("../models/WorkoutPlan");

exports.addWorkout = async (req, res) => {
  try {
    const workout = new WorkoutPlan(req.body);
    await workout.save();
    res.status(201).json(workout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await WorkoutPlan.find();
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
