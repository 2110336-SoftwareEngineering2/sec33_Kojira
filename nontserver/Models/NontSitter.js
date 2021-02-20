"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    name: { type: String, required: true, unique: true, index: true },
    phoneNumber: { type: String },
    bankAccount: { type: String },
  },
  {
    timestamps: true,
    collection: 'nontSitters',
  }
);

const NontSitter = mongoose.model("nontSitters", schema);

module.exports = NontSitter;
