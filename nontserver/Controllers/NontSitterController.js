"use strict";

const NontSitter = require("../Models/NontSitter");
const _ = require("lodash");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
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

  // GET /nontSitters/:id
  getProfile: async (req, res) => {
    try {
      const nontSitterAccount = await NontSitter.findById(req.params.id);
      if (!nontSitterAccount) return res.status(404).send("User not found");
      return res.send(_.omit(nontSitterAccount, ["password"]));
    } catch (error) {
      return res.status(500).send("Cannot access nont-sitter accounts.");
    }
  },

  // PATCH /nontSitters
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
      await NontSitter.findByIdAndUpdate(
        data._id,
        { $set: _.omit(data, ["_id"]) },
        { new: true }
      );
      res.send("The account was successfully updated.");
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

  //PUT /nontSitters/admin_update/:id
  adminUpdateNontSitter: async (req, res) => {
    try {
      const newQuery = {_id: req.params.id};
      const newBody = req.body;
      const updatedNontSitter = await NontSitter.updateOne(newQuery, newBody);
      return res.send(newBody);
    }
    catch(error) {
      return res.status(500).send("Internal Server Error, Please try again");
    }
  },

  /* 
  DELETE /nontSitters/remove/:id
  */
  removeNontSitter: async (req, res) => {
    try {      
      // remove nontSitter
      const newQuery = { _id: mongoose.Types.ObjectId(req.params.id)};
      const deleted = await NontSitter.deleteOne(newQuery);
      return res.send(deleted);
    }
    catch (error) {
      return res.status(500).send("Cannot remove NontSitter");
    }
  },

};

module.exports = controller;
