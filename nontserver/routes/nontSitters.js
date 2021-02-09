"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../Controllers/NontSitterController");
const corsOptions = require("../Utils/corsOptions");
const cors = require("cors");

router
  .route("/")
  .get(controller.getNontSitters)
  .post(controller.registerNontSitter);

router.route("/login").post(cors(corsOptions), controller.login);

module.exports = router;
