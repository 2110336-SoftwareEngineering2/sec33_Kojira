"use strict";

const express = require('express');
const router = express.Router();
const controller = require('../Controllers/ReservationController');
const authenticateJWTToken = require("../Middlewares/JsonWebToken/JwtAuthenticator");
const nontOwnerAuthenticator = require('../Middlewares/UserAuthenticate/UserAuthenticateMiddleWare').nontOwnerAuthenticator;
const nontSitterAuthenticator = require("../Middlewares/UserAuthenticate/UserAuthenticateMiddleWare").nontSitterAuthenticator;
const adminAuthenticator = require("../Middlewares/UserAuthenticate/UserAuthenticateMiddleWare").adminAuthenticator;
router.route('/')
      .get(authenticateJWTToken,controller.getReservation);

router.route('/:id')
      .get(authenticateJWTToken,controller.getReservationByID);

router.route('/unpop/:id')
      .get(authenticateJWTToken,controller.getReservationUnpopByID);
  
router.route('/nontowner_id/:id')
      .get(authenticateJWTToken,controller.getReservationByNontOwnerID);
  
router.route('/nontsitter_id/:id')
      .get(authenticateJWTToken,controller.getReservationByNontSitterID);

router.route('/shelter_id/:id')
      .get(authenticateJWTToken,controller.getReservationByShelterID);

router.route('/room_id/:id')
      .get(authenticateJWTToken,controller.getReservationByRoomID);
      
router.route('/create')
      .post(authenticateJWTToken,nontOwnerAuthenticator,controller.create);

router.route('/verify_check_in/:id')
      .put(authenticateJWTToken,nontSitterAuthenticator,controller.nontSitterCheckIn);

router.route('/check_in/:id')
      .put(authenticateJWTToken,nontOwnerAuthenticator,controller.nontOwnerCheckIn);

router.route('/verify_check_out/:id')
      .put(authenticateJWTToken,nontSitterAuthenticator,controller.nontSitterCheckOut);

router.route('/check_out/:id')
      .put(authenticateJWTToken,nontOwnerAuthenticator,controller.nontOwnerCheckOut);

router.route('/cancel/:id')
      .patch(authenticateJWTToken,nontOwnerAuthenticator,controller.cancelReservation);

router.route("/remove/:id")
      .delete(authenticateJWTToken,adminAuthenticator,controller.remove);

router.route('/admin_update/:id')
      .put(authenticateJWTToken,adminAuthenticator,controller.adminUpdateReservation);

 
module.exports = router;
