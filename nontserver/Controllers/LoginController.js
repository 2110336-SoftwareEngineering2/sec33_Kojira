"use strict";
const bcrypt = require("bcrypt");
const generateAccessToken = require("../Middlewares/JsonWebToken/JwtGenerator");
const LoginError = require("../Constants/ErrorTypes/LoginError");

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
            const token = generateAccessToken({
              email: req.body.email,
              userType: req.body.userType,
            });
            res.json({
              login: true,
              token: token,
              email: req.body.email,
              userType: req.body.userType,
            });
          } else {
            res.json({
              login: false,
              error: LoginError.INCORRECT_USERNAME_OR_PASSWORD,
            });
          }
        } catch (err) {
          throw err;
        }
      } else {
        res.json({
          login: false,
          error: LoginError.INCORRECT_USERNAME_OR_PASSWORD,
        });
      }
    } catch (err) {
      //console.log(err);
      res.statusCode = 500;
      res.json({ login: false, error: LoginError.UNKNOWN_ERROR });
    }
  },
};

module.exports = controller;
