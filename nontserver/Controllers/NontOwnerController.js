"use strict";

const NontOwner = require("../Models/NontOwner");
const _ = require('lodash');
const hashing = require('../Utils/hashing');

const controller = {

  // GET /nontOwners
  getNontOwners: async (req, res) => {
    try {
      const nontOwnerAccounts = await NontOwner.find();
      return res.send(nontOwnerAccounts);
    } catch (error) {
      return res.status(500).send("Cannot access Nont Owner accounts");
    }
  },

  // POST /nontOwners
  registerNontOwner: async (req, res) => {
    try {
      const hashedPassword = await hashing(req.body.password);
      const newBody = { ...req.body, password: hashedPassword };
      try {
        const nontOwnerAccount = await NontOwner.create(newBody);
        return res.send( _.pick(nontOwnerAccount, ['_id', 'email', 'name']) );
      } catch (error) {
        throw error;
      }
    } catch(error) {
      return res.status(500).send("Cannot create Nont Owner account.");
    }
  },
  
}

module.exports = controller;
