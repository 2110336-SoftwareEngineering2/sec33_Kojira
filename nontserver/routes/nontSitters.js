"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../Controllers/NontSitterController");
const corsOptions = require("../Config/corsOptions");
const cors = require("cors");
const authenticateJWTToken = require("../Middlewares/JsonWebToken/JwtAuthenticator");
const nontSitterAuthenticator = require("../Middlewares/UserAuthenticate/UserAuthenticateMiddleWare")
  .nontSitterAuthenticator;
const adminAuthenticator = require("../Middlewares/UserAuthenticate/UserAuthenticateMiddleWare")
  .adminAuthenticator;

router
  .route("/")
  .get(authenticateJWTToken, adminAuthenticator, controller.getNontSitters)
  .post(controller.create)
  .patch(
    authenticateJWTToken,
    nontSitterAuthenticator,
    controller.updateAccount
  );

router
  .route("/:id")
  .get(authenticateJWTToken, nontSitterAuthenticator, controller.getProfile);

router.route("/check-email").post(controller.checkValidEmail);

router.route("/check-name").post(controller.checkValidName);

router.route("/login").post(cors(corsOptions), controller.login);

router
  .route("/admin_update/:id")
  .put(
    authenticateJWTToken,
    adminAuthenticator,
    controller.adminUpdateNontSitter
  );

router
  .route("/remove/:id")
  .delete(authenticateJWTToken, adminAuthenticator, controller.remove);

module.exports = router;
