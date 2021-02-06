"use strict";

const NontOwner = require("../Models/NontOwner");
const _ = require('lodash');

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
    // NEED validation
    // NEED password hashing
    try {
      let nontOwnerAccount = await NontOwner.create(req.body);
      return res.send( _.omit(nontOwnerAccount, 'password') );
    } catch (error) {
      return res.status(500).send("Cannot create Nont Owner account.");
    }
  },

}

module.exports = controller;
