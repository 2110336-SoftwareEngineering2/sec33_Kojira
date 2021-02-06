'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../Controllers/NontOwnerController');

router
  .route('/')
  .post(controller.registerNontOwner);

module.exports = router;