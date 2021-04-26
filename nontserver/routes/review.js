"use strict";

const express = require('express');
const router = express.Router();
const controller = require('../Controllers/ReviewController');
const authenticateJWTToken = require("../Middlewares/JsonWebToken/JwtAuthenticator");
const nontOwnerAuthenticator = require('../Middlewares/UserAuthenticate/UserAuthenticateMiddleWare').nontOwnerAuthenticator;
const nontSitterAuthenticator = require("../Middlewares/UserAuthenticate/UserAuthenticateMiddleWare").nontSitterAuthenticator;
const adminAuthenticator = require("../Middlewares/UserAuthenticate/UserAuthenticateMiddleWare").adminAuthenticator;
router.route('/')
    .get(authenticateJWTToken,controller.getReviews)
    .post(authenticateJWTToken,nontOwnerAuthenticator,controller.create)
    .patch(authenticateJWTToken,nontOwnerAuthenticator,controller.updateReview);

router.route('/:id')
    .get(authenticateJWTToken,controller.getReviewByID);

router
    .route("/shelterid/:id")
    .get(authenticateJWTToken,controller.getReviewByShelterID);

router
    .route("/reservationid/:id")
    .get(authenticateJWTToken,controller.getReviewByReservationID);

router
    .route("/nontownerid/:id")
    .get(authenticateJWTToken,controller.getReviewByNontOwnerID);

router
    .route("/remove/:id")
    .delete(authenticateJWTToken,controller.remove);

router
    .route('/admin_update/:id')
    .put(authenticateJWTToken,adminAuthenticator,controller.adminUpdateReview);

module.exports = router;