"use strict";

const mongoose = require('mongoose');
const Nont = require('./Nont');
const NontOwner = require('./NontOwner');
const NontSitter = require('./NontSitter');
const Rooms = require('./Room');
const Shelters = require('./Shelters');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;


const schema = new Schema({
    nont_id: {type:[{type:ObjectId, ref:Nont}], required:true},
    nontowner_id: {type:ObjectId, ref:NontOwner, required:true},
    room_id: {type:ObjectId, ref:Rooms, required:true},
    shelter_id: {type:ObjectId, ref:Shelters, required:true},
    nontsitter_id: {type:ObjectId, ref:NontSitter, required:true},
    start_datetime: {type:String, required:true},
    end_datetime: {type:String, required:true},
    price: {type:Number, required:true},
    status: {type:String, enum:['payment-pending','paid','checked-in','checked-out','cancelled'], required:true},
    nontsitter_check_in: {type:Boolean, required:true},
    nontsitter_check_out: {type:Boolean, required:true},
    nontowner_check_in: {type:Boolean, required:true},
    nontowner_check_out: {type:Boolean, required:true},
    reserve_datetime: {type:String, required:true},
    pay_datetime: {type:String},
    transaction_id: {type:ObjectId, ref:'Transaction'},
    check_in_datetime: {type:String},
    check_out_datetime: {type:String}, //same as closed
    cancel_datetime: {type:String}
});

// cascade delete by pre hook
schema.pre('deleteOne', { document: false, query: true }, async function () {
    // console.log(this.getFilter());
    // 'this' is Query, call getFilter to convert it to Object, eg. { _id: 60693e5aa23ff3002298878d }
    // The object will be the same as the one that send through method, in this case Model.deleteOne(query)
    // find all review that have matched reservation_id
    const reviewRes = await require('./Review').find({reservation_id: this.getFilter()["_id"]});
    // call deleteOne of each review
    reviewRes.forEach( async (element) => {
        await require('./Review').deleteOne({ _id: element._id});
    });
});

const Reservation = mongoose.model('reservations',schema);

module.exports = Reservation;