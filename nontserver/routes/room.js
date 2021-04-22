"use strict";

const express = require('express');
const router = express.Router();
const controller = require('../Controllers/RoomController');
const authenticateJWTToken = require("../Middlewares/JsonWebToken/JwtAuthenticator");
const nontSitterAuthenticator = require("../Middlewares/UserAuthenticate/UserAuthenticateMiddleWare").nontSitterAuthenticator;
const adminAuthenticator = require("../Middlewares/UserAuthenticate/UserAuthenticateMiddleWare").adminAuthenticator;

router
    .route('/')
    .get(authenticateJWTToken, controller.getRooms)
    .post(authenticateJWTToken, nontSitterAuthenticator, controller.create);

router
    .route('/id/:id')
    .get(authenticateJWTToken, controller.getRoomByID);

router
    .route('/name/:name')
    .get(authenticateJWTToken, controller.getRoomByName);

router
    .route('/nont-type/:type')
    .get(authenticateJWTToken, controller.getRoomByNontType);

router
    .route("/shelterid/:id")
    .get(authenticateJWTToken, controller.getRoomByShelterID);

router
    .route("/update/:id")
    .patch(authenticateJWTToken, nontSitterAuthenticator, controller.updateRoom);

router
    .route("/delete/:id")
    .patch(authenticateJWTToken, nontSitterAuthenticator, controller.deleteRoom);

router
    .route("/remove/:id")
    .delete(authenticateJWTToken, adminAuthenticator, controller.remove);

router
    .route('/admin_update/:id')
    .put(authenticateJWTToken, adminAuthenticator, controller.adminUpdateRoom);

router
    .route('/admin_get/:id')
    .get(authenticateJWTToken, adminAuthenticator, controller.adminGetRoom);

module.exports = router;