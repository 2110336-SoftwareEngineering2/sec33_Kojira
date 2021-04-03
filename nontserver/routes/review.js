"use strict";

const express = require('express');
const router = express.Router();
const controller = require('../Controllers/ReviewController');

router.route('/')
    .get(controller.getReviews)
    .post(controller.createReview)
    .patch(controller.updateReview);

router.route('/:id')
    .get(controller.getReviewByID);

router
    .route("/shelterid/:id")
    .get(controller.getReviewByShelterID);

router
    .route("/reservationid/:id")
    .get(controller.getReviewByReservationID);

router
    .route("/nontownerid/:id")
    .get(controller.getReviewByNontOwnerID);

router
    .route("/delete/:id")
    .delete(controller.deleteReview);

module.exports = router;