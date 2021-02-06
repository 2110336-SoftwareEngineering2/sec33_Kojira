"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../Controllers/NontSitterController");

router
  .route("/")
  .get(controller.getNontSitters)
  .post(controller.registerNontSitter);

router.route("/login").post(controller.login);

module.exports = router;
