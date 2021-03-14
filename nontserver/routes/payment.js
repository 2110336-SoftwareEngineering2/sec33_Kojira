const express = require("express");
const router = express.Router();
const os = require("os");
const networkInterfaces = os.networkInterfaces();
const RandomCodes = require("random-codes");
const rc = new RandomCodes();

//const controller = require('../Controllers/NontController');

router.route("/QR").get((req, res) => {
  var validated_code = rc.validate(req.query.code);
  if (validated_code !== req.query.code) {
    res.send("code not match");
  } else {
    console.log("QR scanned");
    res.send("payment finished");
  }
});

router.route("/getServerIpAddress").get((req, res) => {
  res.json({ ip: networkInterfaces["Wi-Fi"][4].address });
});

router.route("/getCode").post((req, res) => {
  const code = rc.generate();
  res.json({ code: code });
});

module.exports = router;
