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
        supported_type:{type:[String]},
        coordinate:{type:{lat:{type:Number,required: true},lng:{type:Number,required: true}},required: true},
        phoneNumber: { type: String },
        license:{type:[{name:String , img:Buffer, contentType: String}]}, //required
        picture:{type:[{name:String , img:Buffer, contentType: String}]}, //required
        nont_sitter_id: {type: ObjectId, required:true, ref:"nontSitters"},
        exist: {type:Boolean, required: true}
    },
    {
        timestamps: true,
        collection: 'shelters'
    }
);

// cascade delete by pre hook
schema.pre('deleteOne', { document: false, query: true }, async function () {
    // 'this' is Query, call getFilter to convert it to Object, eg. { _id: 60693e5aa23ff3002298878d }
    // The object will be the same as the one that send through method, in this case Model.deleteOne(query)
    // find all room that have matched shelter_id
    const roomRes = await require('./Room').find({ "shelter_id": this.getFilter()["_id"] });
    // call deleteOne for each room
    roomRes.forEach( async (element) => {
        await require('./Room').deleteOne({ _id: element._id});
    });
});

const Shelters = mongoose.model('shelters', schema);

module.exports = Shelters;