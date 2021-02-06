const mongoose = require("mongoose");
const mongoconnect = require("../mongoconnect");

mongoose.connect(mongoconnect, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("open", function callback() {
  console.log("connected to Nont Server");
});

db.on("error", function callback() {
  console.log("error");
});

module.exports = db;
