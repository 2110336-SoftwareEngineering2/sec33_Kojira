"use strict";

const NontSitter = require('../Models/NontSitter');

// POST /nontSitters
const registerNontSitter = async (req, res) => {
  // NEED validation
  // NEED password hashing
  try {
    const nontSitterAccount = await NontSitter.create(req.body);
    return res.send(nontSitterAccount._id);
  } catch (error) {
    return res.status(500).send("Something went wrong. Cannot create Nont owner.");
  }
};

module.exports = {
  registerNontSitter,
};

