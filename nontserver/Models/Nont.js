"use strict";

const nontTypes = require('../Constants/nontTypes');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({
    name: {type:String, required:true},
    type: {type:String, enum:Object.values(nontTypes), required:true},
    subtype: {type:String},
    description: {type:String},
    birth_date: {type:Date, required:true},
    medical_certificate: {type:[{name: {type:String, required:true}, img: {data:Buffer, contentType:String, required:true}}]},
    picture: {type:[{img: {data:Buffer, contentType:String}}]},
    nontowner_id: {type:ObjectId, ref:'NontOwner', required:true}
});

schema.index({ name: 1, nontowner_id: 1 }, { unique: true });  //unique index on properties name and nontowner_id

const Nont = mongoose.model('nonts',schema);

module.exports = Nont;