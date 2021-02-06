"use strict";

const NontOwner = require("../Models/NontOwner");

const controller = {

  // POST /nontOwners
  registerNontOwner: async (req, res) => {
    // NEED validation
    // NEED password hashing
    try {
      const nontOwnerAccount = await NontOwner.create(req.body);
      return res.send(nontOwnerAccount._id);
    } catch (error) {
      return res.status(500).send("Something went wrong. Cannot create Nont owner.");
    }
  },

}

module.exports = controller;
