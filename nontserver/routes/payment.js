const express = require("express");
const router = express.Router();
//const controller = require('../Controllers/NontController');

router.route("/QR").get((req, res) => {
  console.log("QR scanned");
  res.send("ended");
});

module.exports = router;
