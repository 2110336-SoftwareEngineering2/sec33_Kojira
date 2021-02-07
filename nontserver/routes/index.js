"use strict";

const express = require("express");
const router = express.Router();

const nontOwners = require("./nontOwners");
const nontSitters = require("./nontSitters");
const room = require('./room');

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/nontOwners", nontOwners);
router.use("/nontSitters", nontSitters);
router.use('/room', room);

module.exports = router;
