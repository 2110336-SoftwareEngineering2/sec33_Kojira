"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../Controllers/NontOwnerController");
const corsOptions = require("../Config/corsOptions");
const cors = require("cors");

router
  .route("/")
  .get(controller.getNontOwners)
  .post(controller.create)
  .patch(controller.updateAccount);

router
  .route("/:id")
  .get(controller.getProfile);

router.route("/check-email").post(controller.checkValidEmail);

router.route("/check-name").post(controller.checkValidName);

router.route("/login").post(cors(corsOptions), controller.login);

router
  .route("/admin_update/:id")
  .put(controller.adminUpdateNontOwner);

router
  .route("/remove/:id")
  .delete(controller.remove);

module.exports = router;
