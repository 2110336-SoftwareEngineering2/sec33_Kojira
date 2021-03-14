"use strict";

const express = require('express');
const router = express.Router();
const controller = require('../Controllers/ReservationController');
  
router.route('/nontowner_id/:id')
      .get(controller.getReservationByNontOwnerID);
  
router.route('/nontsitter_id/:id')
      .get(controller.getReservationByNontSitterID);

router.route('/shelter_id/:id')
      .get(controller.getReservationByShelterID);
      
router.route('/create')
      .post(controller.createReservation);

router.route('/verify_check_in/:id')
      .put(controller.nontSitterCheckIn);

router.route('/check_in/:id')
      .put(controller.nontOwnerCheckIn);

router.route('/verify_check_out/:id')
      .put(controller.nontSitterCheckOut);

router.route('/check_out/:id')
      .put(controller.nontOwnerCheckOut);

router.route('/cancel/:id')
      .put(controller.cancelReservation);

 
module.exports = router;
