"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../Controllers/NontOwnerController");

router
  .route("/")
  .get(controller.getNontOwners)
  .post(controller.registerNontOwner);

router.route("/login").post(controller.login);

module.exports = router;
