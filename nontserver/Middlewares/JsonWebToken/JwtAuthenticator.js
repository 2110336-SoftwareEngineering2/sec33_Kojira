const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const secret = process.env.SECRET_TOKEN;

function authenticateJWTToken(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401);
  } // if there isn't any token
  console.log(token);

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      console.log(err);
      res.sendStatus(401);
    } else {
      req.user = user;
      next(); // pass the execution off to whatever request the client intended
    }
  });
}

module.exports = authenticateJWTToken;
