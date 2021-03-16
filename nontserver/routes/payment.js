const express = require("express");
const router = express.Router();
const os = require("os");
const networkInterfaces = os.networkInterfaces();
const controller = require("../Controllers/PaymentController");

//const controller = require('../Controllers/NontController');

router.route("/QR").get(controller.payment);

router.route("/getServerIpAddress").get((req, res) => {
  res.json({ ip: networkInterfaces["Wi-Fi"][4].address });
});

router.route("/getCode").post((req, res) => {
  const code = rc.generate();
  res.json({ code: code });
});

module.exports = router;
