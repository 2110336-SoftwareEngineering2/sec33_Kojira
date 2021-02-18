"use strict";

const express = require('express');
const router = express.Router();
const controller = require('../Controllers/RoomController');

router
    .route('/')
    .get(controller.getRooms)
    .post(controller.registerRoom)
    .put(controller.updateRoom);
router
    .route('/id/:id')
    .get(controller.getRoomByID);

router
    .route('/name/:name')
    .get(controller.getRoomByName);
router
    .route('/nont-type/:type')
    .get(controller.getRoomByNontType);
module.exports = router;