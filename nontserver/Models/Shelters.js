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
        supported_type:{type:[String],required: true,},
        coordinate:{type:{lat:{type:Number,required: true},lng:{type:Number,required: true}},required: true},
        phoneNumber: { type: String },
        license:{type:[{name:String , img:Buffer}],required:true},
        picture:{type:[{name:String , img:Buffer}],required:true},
        rooms: {type:[{room_id: {type: ObjectId ,ref :"rooms" }}],required:true},
    },
    {
        timestamps: true,
        collection: 'shelters'
    }
);

const Shelters = mongoose.model('shelters', schema);

module.exports = Shelters;