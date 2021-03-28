"use strict";

const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/AdminController");
const corsOptions = require("../Config/corsOptions");
const cors = require("cors");

router.route("/login").post(cors(corsOptions), adminController.login);

router.route("/create").post(adminController.addAdmin);

router.route("/").get(adminController.getAdmins);

module.exports = router;
