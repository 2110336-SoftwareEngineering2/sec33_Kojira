"use strict";

const express = require('express');
const router = express.Router();
const controller = require('../Controllers/ReviewController');

router.route('/')
    .get(controller.getReviews)
    .post(controller.createReview);

module.exports = router;