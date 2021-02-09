const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const secret = process.env.SECRET_TOKEN;

function generateAccessToken(data) {
  return jwt.sign(data, secret, {
    expiresIn: "1800s", // expires after half an hour
  });
}

module.exports = generateAccessToken;
