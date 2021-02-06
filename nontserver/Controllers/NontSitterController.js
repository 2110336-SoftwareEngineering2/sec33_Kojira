"use strict";

const NontSitter = require('../Models/NontSitter');
const _ = require('lodash');

const controller = {

  // POST /nontSitters
  registerNontSitter: async (req, res) => {
    // NEED validation
    // NEED password hashing
    try {
      const nontSitterAccount = await NontSitter.create(req.body);
      return res.send( _.omit(nontSitterAccount, 'password') );
    } catch (error) {
      return res.status(500).send("Cannot create Nont Sitter.");
    }
  },

}

module.exports = controller;
