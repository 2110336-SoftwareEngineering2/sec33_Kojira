"use strict";

const express = require('express');
const router = express.Router();
const controller = require('../Controllers/ShelterController.js');

router
    .route('/')
    .get(controller.getShelters)
    .post(controller.registerShelter)
    .patch(controller.updateShelter);
router
    .route('/id/:id')
    .get(controller.getShelterByID);

router
    .route('/name/:name')
    .get(controller.getShelterByName);

router
    .route("/email/:email")
    .get(controller.getShelterByEmail);

router
    .route("/nontsitterid/:id")
    .get(controller.getShelterByNontSitterID);

module.exports = router;