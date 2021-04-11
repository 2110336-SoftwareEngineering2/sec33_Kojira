const express = require("express");
const router = express.Router();
const controller = require("../Controllers/PaymentController");
const RandomCodes = require("random-codes");
const rc = new RandomCodes();

router.route("/QR").get(controller.payment);
router.route("/getCode").post(controller.getCode);

module.exports = router;
