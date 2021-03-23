"use strict";

const Admin = require("../Models/Admin");
const LoginController = require("./LoginController");

const controller = {
  // POST /admin/login
  login: async (req, res) => LoginController.login(req, res, Admin),
};

module.exports = controller;
