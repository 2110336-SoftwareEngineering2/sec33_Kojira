'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../Controllers/NontOwnerController');

router
  .route('/')
  .get(controller.getNontOwners)
  .post(controller.registerNontOwner);

module.exports = router;