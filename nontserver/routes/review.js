"use strict";

const express = require('express');
const router = express.Router();
const controller = require('../Controllers/ReviewController');

router.route('/')
    .get(controller.getReviews)
    .post(controller.createReview);

router
    .route("/shelterid/:id")
    .get(controller.getReviewByShelterID);

module.exports = router;