'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../Controllers/NontSitterController');

router
  .route('/')
  .get(controller.getNontSitters)
  .post(controller.registerNontSitter);

module.exports = router;