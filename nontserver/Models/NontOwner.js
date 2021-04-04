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
    collection: 'nontOwners',
  }
);

// cascade delete by pre hook
schema.pre('deleteOne', { document: false, query: true }, async function () {
  // 'this' is Query, call getFilter to convert it to Object, eg. { _id: 60693e5aa23ff3002298878d }
  // The object will be the same as the one that send through method, in this case Model.deleteOne(query)
  // find all nont that have matched nontowner_id
  const nontRes = await require('./Nont').find({ "nontowner_id": this.getFilter()["_id"] });
  // call deleteOne for each nont
  nontRes.forEach( async (element) => {
      await require('./Nont').deleteOne({ _id: element._id});
  });
});

const NontOwner = mongoose.model("nontOwners", schema);

module.exports = NontOwner;
