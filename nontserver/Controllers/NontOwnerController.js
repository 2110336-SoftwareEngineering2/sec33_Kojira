"use strict";

const NontOwner = require("../Models/NontOwner");
const _ = require("lodash");
const Joi = require('joi');
const bcrypt = require('bcrypt');
const LoginController = require("./LoginController");

const PASSWORD_HASHING_ROUNDS = 10;

const validator = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8).max(32),
  name: Joi.string().required().min(1).max(64),
  phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/),
  bankAccount: Joi.string().length(10).pattern(/^[0-9]+$/),
});

const controller = {

  // GET /nontOwners
  getNontOwners: async (req, res) => {
    try {
      const nontOwnerAccounts = await NontOwner.find();
      return res.send(nontOwnerAccounts);
    } catch (error) {
      return res.status(500).send("Cannot access nont-owner accounts.");
    }
  },

  // POST /nontOwners
  registerNontOwner: async (req, res) => {

    const validationResult = validator.validate(req.body)
    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    }

    try {
      const emailFindResult = await NontOwner.findOne({ email: req.body.email });
      if (emailFindResult) return res.status(403).send('Email already exists.');
      const nameFindResult = await NontOwner.findOne({ name: req.body.name });
      if (nameFindResult) return res.status(403).send('Username already exists.');
    } catch(error) {
      return res.status(500).send('Cannot access nont-owner-account database.');
    }

    try {
      const hashedPassword = await bcrypt.hash(req.body.password, PASSWORD_HASHING_ROUNDS);
      const newBody = { ...req.body, password: hashedPassword };
      try {
        const nontOwnerAccount = await NontOwner.create(newBody);
        return res.send(_.pick(nontOwnerAccount, ["_id", "email", "name"]));
      } catch (error) {
        throw error;
      }
    } catch (error) {
      return res.status(500).send("Cannot create nont-owner account.");
    }
  },

  // POST /nontOwners/login
  login: async (req, res) => LoginController.login(req, res, NontOwner),

};

module.exports = controller;
