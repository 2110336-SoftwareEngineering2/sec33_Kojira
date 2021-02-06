"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String },
    bankAccount: { type: String },
    shelters: [{ type: ObjectId, ref: "shelters" }],
  },
  {
    timestamps: true,
  }
);

const NontSitter = mongoose.model("nontSitters", schema);

module.exports = NontSitter;
