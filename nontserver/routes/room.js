"use strict";

const express = require('express');
const router = express.Router();
const controller = require('../Controllers/RoomController');

router
    .route('/')
    .get(controller.getRooms)
    .post(controller.registerRoom);

module.exports = router;