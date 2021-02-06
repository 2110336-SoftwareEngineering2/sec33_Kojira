"use strict";
const bcrypt = require("bcrypt");
const generateAccessToken = require("../Middlewares/JasonWebToken/JwtGenerator");

const controller = {
  login: async function (req, res, Schema) {
    try {
      const Result = await Schema.findOne({
        email: req.body.email,
      });
      if (Result) {
        try {
          const comparedResult = await bcrypt.compare(
            req.body.password,
            Result.password
          );
          if (comparedResult) {
            const token = generateAccessToken({ username: req.body.username });
            res.json({ login: true, token: token });
          } else {
            res.status(500).send("Username or password incorrect");
          }
        } catch (err) {
          throw err;
        }
      } else {
        res.status(500).send("No this username");
      }
    } catch (err) {
      //console.log(err);
      res.status(500).send("Cannot Login");
    }
  },
};

module.exports = controller;
