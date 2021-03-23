"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model("admin", schema);

module.exports = Admin;
