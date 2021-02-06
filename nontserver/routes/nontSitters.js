'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../Controllers/NontSitterController');

router
  .route('/')
  .post(controller.registerNontSitter);

module.exports = router;