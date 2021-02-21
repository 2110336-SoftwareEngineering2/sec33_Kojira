"use strict";

const express = require('express');
const router = express.Router();
const controller = require('../Controllers/NontController');

router.route('/')
      .get(controller.getNonts)
      .post(controller.registerNont)
      .put(controller.updateNont)
      .delete(controller.deleteNont);

router.route('/id/:id')
      .get(controller.getNontByID);
  
router.route('/name/:name')
      .get(controller.getNontByName);
  
router.route('/type/:type')
      .get(controller.getNontByType);
  
module.exports = router;