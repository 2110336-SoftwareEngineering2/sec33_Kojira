"use strict";

const NontSitter = require("../Models/NontSitter");
const _ = require("lodash");
const hashing = require("../Utils/hashing");
const LoginController = require("./LoginController");

const controller = {
  // GET /nontSitters
  getNontSitters: async (req, res) => {
    try {
      const nontSitterAccounts = await NontSitter.find();
      return res.send(nontSitterAccounts);
    } catch (error) {
      return res.status(500).send("Cannot access Nont Sitter accounts");
    }
  },

  // POST /nontSitters
  registerNontSitter: async (req, res) => {
    try {
      const hashedPassword = await hashing(req.body.password);
      const newBody = { ...req.body, password: hashedPassword };
      try {
        const nontSitterAccount = await NontSitter.create(newBody);
        return res.send(_.pick(nontSitterAccount, ["_id", "email", "name"]));
      } catch (error) {
        throw error;
      }
    } catch (error) {
      return res.status(500).send("Cannot create Nont Sitter account.");
    }
  },

  // POST /nontSitters/login
  login: async (req, res) => LoginController.login(req, res, NontSitter),
};

module.exports = controller;
