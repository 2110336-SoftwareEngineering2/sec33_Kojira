"use strict";
const bcrypt = require("bcryptjs");
const generateAccessToken = require("../Middlewares/JsonWebToken/JwtGenerator");
const LoginError = require("../Constants/ErrorTypes/LoginError");
const Admin = require("../Models/Admin");
const NontOwner = require("../Models/NontOwner");
const NontSitter = require("../Models/NontSitter");

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
            var userType;
            if (Schema === Admin) {
              userType = "admin";
            } else if (Schema === NontSitter) {
              userType = "Nont Sitter";
            } else if (Schema === NontOwner) {
              userType = "Nont Owner";
            }
            const token = generateAccessToken({
              email: req.body.email,
              userType: userType,
              name: Result.name,
              _id: Result._id,
              createdAt: Result.createdAt,
              updatedAt: Result.updatedAt,
            });
            res.json({
              login: true,
              token: token,
              email: req.body.email,
              userType: userType,
              name: Result.name,
            });
          } else {
            console.log("password incorrect");
            res.json({
              login: false,
              error: LoginError.INCORRECT_USERNAME_OR_PASSWORD,
            });
          }
        } catch (err) {
          throw err;
        }
      } else {
        console.log("no email found");
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
