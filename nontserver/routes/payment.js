const express = require("express");
const router = express.Router();
const controller = require("../Controllers/PaymentController");
const RandomCodes = require("random-codes");
const rc = new RandomCodes();

router.route("/QR").get(controller.payment);
router.route("/getCode").post((req, res) => {
  try {
    const code = rc.generate();
    res.json({ code: code });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
