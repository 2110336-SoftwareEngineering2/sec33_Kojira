"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema(
    {
        name: { type: String, required: true, unique: true, index: true },
        description :{type:String},
        address:{type:String, required: true},
        rate:{type:Number,required:true},
        supported_type:{type:[String]}, //delete required
        coordinate:{type:{lat:{type:Number,required: true},lng:{type:Number,required: true}},required: true},
        phoneNumber: { type: String },
        license:{type:[{name:String , img:Buffer, contentType: String}]}, //required
        picture:{type:[{name:String , img:Buffer, contentType: String}]}, //required
        nont_sitter_id: {type: ObjectId, required:true, ref:"nontSitters"},
    },
    {
        timestamps: true,
        collection: 'shelters'
    }
);

const Shelters = mongoose.model('shelters', schema);

module.exports = Shelters;