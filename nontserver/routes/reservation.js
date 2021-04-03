"use strict";

const express = require('express');
const router = express.Router();
const controller = require('../Controllers/ReservationController');

router.route('/')
      .get(controller.getReservation);

router.route('/:id')
      .get(controller.getReservationByID);
  
router.route('/nontowner_id/:id')
      .get(controller.getReservationByNontOwnerID);
  
router.route('/nontsitter_id/:id')
      .get(controller.getReservationByNontSitterID);

router.route('/shelter_id/:id')
      .get(controller.getReservationByShelterID);

router.route('/room_id/:id')
      .get(controller.getReservationByRoomID);
      
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

router.route('/update/:id')
      .put(controller.updateReservation);

router.route('/cancel/:id')
      .patch(controller.cancelReservation);

router.route("/remove/:id")
      .delete(controller.removeReservation);

 
module.exports = router;
