"use strict";

const NontSitter = require("../Models/NontSitter");
const _ = require("lodash");
const Joi = require('joi');
const hash = require("../Utils/hash");
const LoginController = require("./LoginController");

const validator = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8).max(32),
  name: Joi.string().required().min(2).max(32),
  phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/),
  bankAccount: Joi.string().length(10).pattern(/^[0-9]+$/),
});

const controller = {
  // GET /nontSitters
  getNontSitters: async (req, res) => {
    try {
      const nontSitterAccounts = await NontSitter.find();
      return res.send(nontSitterAccounts);
    } catch (error) {
      return res.status(500).send("Cannot access nont-sitter accounts.");
    }
  },

  // POST /nontSitters
  registerNontSitter: async (req, res) => {
    const validationResult = validator.validate(req.body)
    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    }
    try {
      const emailFindResult = await NontSitter.findOne({ email: req.body.email });
      if (emailFindResult) return res.status(403).send('Email already exists.');
      const nameFindResult = await NontSitter.findOne({ name: req.body.name });
      if (nameFindResult) return res.status(403).send('Username already exists.');
    } catch(error) {
      return res.status(500).send('Cannot access nont-owner-account database.');
    }
    try {
      const hashedPassword = await hash(req.body.password);
      const newBody = { ...req.body, password: hashedPassword };
      try {
        const nontSitterAccount = await NontSitter.create(newBody);
        return res.send(_.pick(nontSitterAccount, ["_id", "email", "name"]));
      } catch (error) {
        throw error;
      }
    } catch (error) {
      return res.status(500).send("Cannot create nont-sitter account.");
    }
  },

  // POST /nontSitters/login
  login: async (req, res) => LoginController.login(req, res, NontSitter),
};

module.exports = controller;
