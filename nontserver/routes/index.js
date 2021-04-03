"use strict";

const express = require("express");
const router = express.Router();

const nontOwners = require("./nontOwners");
const nontSitters = require("./nontSitters");
const room = require("./room");
const shelter = require("./shelters");
const nont = require("./nont");
const payment = require("./payment");
const reservation = require("./reservation");
const review = require("./review");
const admin = require("./admin");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/nontOwners", nontOwners);
router.use("/nontSitters", nontSitters);
router.use("/room", room);
router.use("/shelter", shelter);
router.use("/nont", nont);
router.use("/payment", payment);
router.use("/reservation", reservation);
router.use("/review", review);
router.use("/admin", admin);

module.exports = router;
