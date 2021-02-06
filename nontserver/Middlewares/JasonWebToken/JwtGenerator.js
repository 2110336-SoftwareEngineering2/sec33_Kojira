const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const secret = process.env.SECRET_TOKEN;

function generateAccessToken(username) {
  return jwt.sign(username, secret, {
    expiresIn: "1800s", // expires after half an hour
  });
}

module.exports = generateAccessToken;
