"use strict";

const Admin = require("../Models/Admin");
const LoginController = require("./LoginController");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

const schema = {
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8).max(32),
  userType: Joi.string().required(),
  secret: Joi.string().required(),
};

const validator = Joi.object(schema);

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
    const validationResult = validator.validate(req.body);
    if (validationResult.error) {
      res.send({
        err:
          "review the value of the fields correctly, there should be 4 fields : secret, password, email, and userType. And the password should be between 8 and 32 characters",
      });
    }

    //console.log(req.body);
    const correctHashedSecret = await bcrypt.hash(
      secret,
      PASSWORD_HASHING_ROUNDS
    );
    try {
      const compareResult = await bcrypt.compare(
        req.body.secret,
        correctHashedSecret
      );
      const validEmail = await controller.checkValidEmail(req, res);
      if (compareResult && validEmail && req.body.userType === "admin") {
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
        if (!compareResult) {
          res.send({ err: "can't create admin, secret not correct" });
        } else if (!validEmail) {
          res.send({ err: "this admin email is already in the database" });
        } else {
          res.send({
            err: "review your userType field, it should be 'admin' only",
          });
        }
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
};

module.exports = controller;
