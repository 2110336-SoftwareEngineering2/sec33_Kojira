"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({
    nont_id: {type:[ObjectId], ref:'Nont', required:true},
    nontowner_id: {type:ObjectId, ref:'NontOwner', required:true},
    room_id: {type:ObjectId, ref:'Room', required:true},
    shelter_id: {type:ObjectId, ref:'Shelters', required:true},
    nontsitter_id: {type:ObjectId, ref:'NontSitter', required:true},
    start_datetime: {type:String, required:true},
    end_datetime: {type:String, required:true},
    price: {type:Number, required:true},
    status: {type:String, enum:['payment-pending','paid','checked-in','checked-out','closed','cancelled'], required:true},
    status_change_datetime: {type:String, required:true},
    transaction_id: {type:ObjectId, ref:'Transaction'},
    check_in_datetime: {type:String},
    check_out_datetime: {type:String},
    nontsitter_check_in: {type:Boolean, required:true},
    nontsitter_check_out: {type:Boolean, required:true},
    nontowner_check_in: {type:Boolean, required:true},
    nontowner_check_out: {type:Boolean, required:true}
});

const Reservation = mongoose.model('reservations',schema);

module.exports = Reservation;