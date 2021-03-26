"use strict";

const Admin = require("../Models/Admin");
const LoginController = require("./LoginController");
const bcrypt = require("bcrypt");

const PASSWORD_HASHING_ROUNDS = 10;

const controller = {
  // POST /admin/login
  login: async (req, res) => {
    await LoginController.login(req, res, Admin);
  },

  getAdmins: async (req, res) => {
    Admin.find().then((admin) => res.send(admin));
  },

  checkValidEmail: async (req, res) => {
    const result = await Admin.findOne({ email: req.body.email });
    if (result) {
      return false;
    }
    return true;
  },

  checkValidEmailAPI: async (req, res) => {
    const result = await this.checkValidEmail(req, res);
    if (result) {
      res.send({ email_valid: true });
    }
    res.send({ email_valid: false });
  },

  // secret is "Kojira_secret_code"
  addAdmin: async (req, res) => {
    const secret = "Kojira_secret_code";
    console.log(req.body);
    const correctHashedSecret = await bcrypt.hash(
      secret,
      PASSWORD_HASHING_ROUNDS
    );
    try {
      const hashedSecret = await bcrypt.hash(
        req.body.secret,
        PASSWORD_HASHING_ROUNDS
      );
      const compareResult = await bcrypt.compare(
        correctHashedSecret,
        hashedSecret
      );
      const validEmail = await this.checkValidEmail(req, res);
      if (compareResult && validEmail) {
        const hashedPassword = await bcrypt.hash(
          req.body.password,
          PASSWORD_HASHING_ROUNDS
        );
        const newAdmin = await Admin.create({
          email: req.body.email,
          password: hashedPassword,
          userType: req.body.userType,
        });
        res.send(newAdmin);
      } else {
        res.send({ err: "can't create admin, secret not correct" });
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
};

module.exports = controller;
