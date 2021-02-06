var express = require("express");
var router = express.Router();
const db = require("../Controllers/dbconnector");

const generateAccessToken = require("../Middlewares/JasonWebToken/JwtGenerator");
const authenticateJWTToken = require("../Middlewares/JasonWebToken/JwtAuthenticator");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", function (req, res, next) {
  var login = true;
  // do some querying
  if (login) {
    const token = generateAccessToken({ username: req.body.username });
    res.json({ token: token });
  }
});

router.post("/auth", authenticateJWTToken, function (req, res, next) {
  res.json({ authenticated: true });
});

module.exports = router;
