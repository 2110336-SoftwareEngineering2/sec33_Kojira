"use strict";

const NontSitter = require("../Models/NontSitter");
const _ = require("lodash");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const LoginController = require("./LoginController");

const PASSWORD_HASHING_ROUNDS = 10;

const schema = {
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8).max(32),
  name: Joi.string().required().min(1).max(64),
  phoneNumber: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/),
  bankAccount: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/),
};
const validator = Joi.object(schema);

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

  // GET /nontSitters/profile/:id
  getProfile: async (req, res) => {
    try {
      const nontSitterAccount = await NontSitter.findById(req.params.id);
      if (!nontSitterAccount) return res.status(404).send("User not found");
      const nontSitterProfile = _.pick(nontSitterAccount, ['name', 'phoneNumber']);
      return res.send(nontSitterProfile);
    } catch (error) {
      return res.status(500).send("Cannot access nont-sitter accounts.");
    }
  },

  // PUT /nontSitters/:id
  updateAccount: async (req, res) => {
    try {
      const data = req.body;
      if (data.email) {
        const emailFindResult = await NontSitter.findOne({ email: data.email });
        if (emailFindResult)
          return res.status(403).send("Email already exists.");
      }
      if (data.name) {
        const nameFindResult = await NontSitter.findOne({ name: data.name });
        if (nameFindResult)
          return res.status(403).send("Username already exists.");
      }
      const nontSitterAccount = await NontSitter.findByIdAndUpdate(
        req.params.id,
        { $set: data },
        { new: true }
      );
      res.send(_.pick(nontSitterAccount, ["_id", "email", "name"]));
    } catch (error) {
      return res.status(500).send("Cannot access nont-sitter accounts.");
    }
  },

  // POST /nontSitters
  registerNontSitter: async (req, res) => {
    const validationResult = validator.validate(req.body);
    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    }

    try {
      const emailFindResult = await NontSitter.findOne({
        email: req.body.email,
      });
      if (emailFindResult) return res.status(403).send("Email already exists.");
      const nameFindResult = await NontSitter.findOne({ name: req.body.name });
      if (nameFindResult)
        return res.status(403).send("Username already exists.");
    } catch (error) {
      return res
        .status(500)
        .send("Cannot access nont-sitter-account database.");
    }

    try {
      const hashedPassword = await bcrypt.hash(
        req.body.password,
        PASSWORD_HASHING_ROUNDS
      );
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

  // POST /nontSitter/check-email
  checkValidEmail: async (req, res) => {
    const emailSchema = _.pick(schema, ["email"]);
    const emailValidator = Joi.object(emailSchema);
    const result = emailValidator.validate(req.body);
    if (result.error) return res.send({ status: false, exist: false });
    try {
      const emailFindResult = await NontSitter.findOne({
        email: req.body.email,
      });
      if (emailFindResult) return res.send({ status: false, exist: true });
      else return res.send({ status: true });
    } catch (error) {
      return res
        .status(500)
        .send("Cannot access nont-sitter-account database.");
    }
  },

  // POST /nontSitter/check-name
  checkValidName: async (req, res) => {
    const nameSchema = _.pick(schema, ["name"]);
    const nameValidator = Joi.object(nameSchema);
    const result = nameValidator.validate(req.body);
    if (result.error) return res.send({ status: false, exist: false });
    try {
      const nameFindResult = await NontSitter.findOne({ name: req.body.name });
      if (nameFindResult) return res.send({ status: false, exist: true });
      else return res.send({ status: true });
    } catch (error) {
      return res
        .status(500)
        .send("Cannot access nont-sitter-account database.");
    }
  },

  // POST /nontSitters/login
  login: async (req, res) => LoginController.login(req, res, NontSitter),
};

module.exports = controller;
