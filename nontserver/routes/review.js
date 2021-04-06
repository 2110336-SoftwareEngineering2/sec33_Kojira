"use strict";

const express = require('express');
const router = express.Router();
const controller = require('../Controllers/ReviewController');

router.route('/')
    .get(controller.getReviews)
    .post(controller.create)
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
    .route("/remove/:id")
    .delete(controller.remove);

router
    .route('/admin_update/:id')
    .put(controller.adminUpdateReview);

module.exports = router;