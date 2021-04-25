"use strict";

const express = require('express');
const router = express.Router();
const controller = require('../Controllers/NontController');
const authenticateJWTToken = require('../Middlewares/JsonWebToken/JwtAuthenticator');
const nontOwnerAuthenticator = require('../Middlewares/UserAuthenticate/UserAuthenticateMiddleWare').nontOwnerAuthenticator;
const adminAuthenticator = require('../Middlewares/UserAuthenticate/UserAuthenticateMiddleWare').adminAuthenticator;

router.route('/')
      .get(authenticateJWTToken, controller.getNonts);

router.route('/:id')
      .get(authenticateJWTToken, controller.getNontByID);
  
router.route('/name/:name')
      .get(authenticateJWTToken, controller.getNontByName);
  
router.route('/type/:type')
      .get(authenticateJWTToken, controller.getNontByType);

router.route('/nontowner_id/:id')
      .get(authenticateJWTToken, controller.getNontByNontOwnerID);
      
router.route('/create')
      .post(authenticateJWTToken, nontOwnerAuthenticator, controller.create);

router.route('/update/:id')
      .put(authenticateJWTToken, nontOwnerAuthenticator ,controller.updateNont);

router.route('/delete/:id')
      .patch(authenticateJWTToken, nontOwnerAuthenticator, controller.deleteNont);

router.route('/remove/:id')
      .delete(authenticateJWTToken, adminAuthenticator, controller.remove);

router.route('/admin_update/:id')
      .put(authenticateJWTToken, adminAuthenticator, controller.adminUpdateNont);

module.exports = router;
