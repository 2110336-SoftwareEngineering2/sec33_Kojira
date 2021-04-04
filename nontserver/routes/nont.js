"use strict";

const express = require('express');
const router = express.Router();
const controller = require('../Controllers/NontController');

router.route('/')
      .get(controller.getNonts);

router.route('/:id')
      .get(controller.getNontByID);
  
router.route('/name/:name')
      .get(controller.getNontByName);
  
router.route('/type/:type')
      .get(controller.getNontByType);

router.route('/nontowner_id/:id')
      .get(controller.getNontByNontOwnerID);
      
router.route('/create')
      .post(controller.createNont);

router.route('/update/:id')
      .put(controller.updateNont);

router.route('/cancel/:id')
      .put(controller.cancelNont);

router.route('/delete/:id')
      .delete(controller.deleteNont);

router.route('/admin_update/:id')
      .put(controller.adminUpdateNont);

module.exports = router;
