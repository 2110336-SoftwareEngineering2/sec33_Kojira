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
    birth_date: {type:String, required:true},
    medical_certificate: {type:[{name: {type:String}, img:Buffer}]},
    picture: {type:[{img:Buffer}]},
    nontowner_id: {type:ObjectId, ref:'NontOwner', required:true},
    exist: {type:Boolean, required:true}
});

// cascade delete by pre hook
schema.pre('deleteOne', { document: false, query: true }, async function () {
    // 'this' is Query, call getFilter to convert it to Object, eg. { _id: 60693e5aa23ff3002298878d }
    // The object will be the same as the one that send through method, in this case Model.deleteOne(query)
    // find all reservation that have matched nont_id
    const reserveRes = await require('./Reservation').find({ "nont_id": {$elemMatch: {$eq: this.getFilter()["_id"]}} });
    // call deleteOne for each reservation
    reserveRes.forEach( async (element) => {
        await require('./Reservation').deleteOne({ _id: element._id});
    });
});

//schema.index({ name: 1, nontowner_id: 1 }, { unique: true });  //unique index on properties name and nontowner_id

const Nont = mongoose.model('nonts',schema);

module.exports = Nont;