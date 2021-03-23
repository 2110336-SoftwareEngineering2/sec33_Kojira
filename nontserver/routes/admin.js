"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../Controllers/NontOwnerController");
const corsOptions = require("../Config/corsOptions");
const cors = require("cors");

router.route("/login").post(cors(corsOptions), controller.login);

module.exports = router;
