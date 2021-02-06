"use strict";

const NontOwner = require("../Models/NontOwner");

// POST /nontOwners
const registerNontOwner = async (req, res) => {
  try {
    // NEED validation
    // NEED password hashing
    const nontOwnerAccount = await NontOwner.create(req.body);
    return res.send(nontOwnerAccount._id);
  } catch (error) {
    return res.status(500).send("Something went wrong. Cannot create Nont owner.");
  }
};

module.exports = {
  registerNontOwner
};
