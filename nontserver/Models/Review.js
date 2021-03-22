"use strict";

const mongoose = require('mongoose');
const Nont = require('./Nont');
const NontOwner = require('./NontOwner');
const NontSitter = require('./NontSitter');
const Shelters = require('./Shelters');
const Reservation = require('./Reservation');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema(
    {
    nontowner_id: {type: ObjectId, ref: NontOwner, required: true},
    shelter_id: {type: ObjectId, ref: Shelters, required: true},
    reservation_id: {type: ObjectId, ref: Reservation, required: true, unique: true, index:true},
    rate: {type: Number, required: true},
    comment: {type: String}
    },
    {
        timestamps: true,
        collection: 'reviews',
    }
);

const Review = mongoose.model('reviews', schema);

module.exports = Review;