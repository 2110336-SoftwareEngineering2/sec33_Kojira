"use strict";

const express = require('express');
const router = express.Router();
const controller = require('../Controllers/ShelterController.js');
const authenticateJWTToken = require("../Middlewares/JsonWebToken/JwtAuthenticator");
const nontSitterAuthenticator = require("../Middlewares/UserAuthenticate/UserAuthenticateMiddleWare").nontSitterAuthenticator;
const adminAuthenticator = require("../Middlewares/UserAuthenticate/UserAuthenticateMiddleWare").adminAuthenticator;

router
    .route('/')
    .get(authenticateJWTToken, controller.getShelters)
    .post(authenticateJWTToken, nontSitterAuthenticator, controller.create)
    .patch(authenticateJWTToken, nontSitterAuthenticator, controller.updateShelter);

router
    .route('/allShelters')
    .get(authenticateJWTToken, controller.getAllShelters)

router
    .route('/id/:id')
    .get(authenticateJWTToken, controller.getShelterByID);

router
    .route('/name/:name')
    .get(authenticateJWTToken, controller.getShelterByName);

router
    .route("/nontsitterid/:id")
    .get(authenticateJWTToken, controller.getShelterByNontSitterID);
    
router.route('/delete/:id')
    .patch(authenticateJWTToken, nontSitterAuthenticator, controller.deleteShelter);

router
    .route("/check-name")
    .post(authenticateJWTToken, controller.checkValidName);

router
    .route('/admin_get/:id')
    .get(authenticateJWTToken, adminAuthenticator, controller.adminGetShelter);

router
    .route('/admin_update/:id')
    .put(authenticateJWTToken, adminAuthenticator, controller.adminUpdateShelter);

router 
    .route("/remove/:id")
    .delete(authenticateJWTToken, adminAuthenticator, controller.remove);

router
    .route("/findShelters")
    .get(authenticateJWTToken, controller.findShelters);
    
module.exports = router;