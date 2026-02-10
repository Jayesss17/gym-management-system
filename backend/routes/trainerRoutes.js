const express = require("express");
const { getTrainers, addTrainer } = require("../controllers/trainerController");

const router = express.Router();

router.get("/", getTrainers);
router.post("/", addTrainer);

module.exports = router;
