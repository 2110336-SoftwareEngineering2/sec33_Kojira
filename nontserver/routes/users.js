var express = require("express");
var router = express.Router();
const authenticateJWTToken = require("../Middlewares/JsonWebToken/JwtAuthenticator");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// check validity of the token
router.post("/auth", authenticateJWTToken, function (req, res, next) {
  res.json({
    authenticated: true,
    email: req.user.email,
    userType: req.user.userType,
    name: req.user.name,
  });
});

module.exports = router;
