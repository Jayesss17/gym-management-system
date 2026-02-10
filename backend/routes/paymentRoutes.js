const express = require("express");
const { getPayments, addPayment } = require("../controllers/paymentController");

const router = express.Router();

router.get("/", getPayments);
router.post("/", addPayment);

module.exports = router;
