"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../Controllers/NontOwnerController");
const corsOptions = require("../Config/corsOptions");
const cors = require("cors");
const authenticateJWTToken = require("../Middlewares/JsonWebToken/JwtAuthenticator");
const nontOwnerAuthenticator = require("../Middlewares/UserAuthenticate/UserAuthenticateMiddleWare")
  .nontOwnerAuthenticator;
const adminAuthenticator = require("../Middlewares/UserAuthenticate/UserAuthenticateMiddleWare")
  .adminAuthenticator;

router
  .route("/")
  .get(authenticateJWTToken, adminAuthenticator, controller.getNontOwners)
  .post(controller.create)
  .patch(
    authenticateJWTToken,
    nontOwnerAuthenticator,
    controller.updateAccount
  );

router
  .route("/:id")
  .get(authenticateJWTToken, nontOwnerAuthenticator, controller.getProfile);

router.route("/check-email").post(controller.checkValidEmail);

router.route("/check-name").post(controller.checkValidName);

router.route("/login").post(cors(corsOptions), controller.login);

router
  .route("/admin_update/:id")
  .put(
    authenticateJWTToken,
    adminAuthenticator,
    controller.adminUpdateNontOwner
  );

router
  .route("/remove/:id")
  .delete(authenticateJWTToken, adminAuthenticator, controller.remove);

module.exports = router;
