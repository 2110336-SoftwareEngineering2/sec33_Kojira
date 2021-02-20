"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../Controllers/NontOwnerController");
const corsOptions = require("../Config/corsOptions");
const cors = require("cors");

router
  .route("/")
  .get(controller.getNontOwners)
  .post(controller.registerNontOwner)
  .put(controller.updateAccount);

router
  .route("/:id")
  .get(controller.getProfile);

router
  .route("/check-email")
  .post(controller.checkValidEmail);

router
  .route("/check-name")
  .post(controller.checkValidName);

router.route("/login").post(cors(corsOptions), controller.login);

module.exports = router;
