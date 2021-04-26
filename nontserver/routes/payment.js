const express = require("express");
const router = express.Router();
const controller = require("../Controllers/PaymentController");
const RandomCodes = require("random-codes");
const rc = new RandomCodes();
const authenticateJWTToken = require("../Middlewares/JsonWebToken/JwtAuthenticator");
const UserAuthenticator = require("../Middlewares/UserAuthenticate/UserAuthenticateMiddleWare");

router
  .route("/QR")
  .get(
    authenticateJWTToken,
    UserAuthenticator.nontOwnerAuthenticator,
    controller.payment
  );

router
  .route("/getCode")
  .post(
    authenticateJWTToken,
    UserAuthenticator.nontOwnerAuthenticator,
    controller.getCode
  );

module.exports = router;
