const generateAccessToken = require("../Middlewares/JasonWebToken/JwtGenerator");
const controller = require("../Controllers/LoginController");

var express = require("express");
var router = express.Router();

router.post("/login", function (req, res, next) {
  var login = true;
  // do some querying
  if (login) {
    const token = generateAccessToken({ username: req.body.username });
    res.json({ token: token });
  }
});
