"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema(
    {
        name: {type: String, required:true},
        nont_type: {type: String, required: true},
        amount: {type: Number, required: true},
        price: {type: Number, required: true},
        shelter_id: {type: ObjectId, required: true, ref:"shelters"},
        exist: {type: Boolean, required: true},
    },
    {
        timestamps: true,
        collection: 'rooms'
    }
);

// cascade delete by pre hook
schema.pre('deleteOne', { document: false, query: true }, async function () {
    // 'this' is Query, call getFilter to convert it to Object, eg. { _id: 60693e5aa23ff3002298878d }
    // The object will be the same as the one that send through method, in this case Model.deleteOne(query)
    // find all reservation that have matched room_id
    const reserveRes = await require('./Reservation').find({ "room_id": this.getFilter()["_id"] });
    // call deleteOne for each reservation
    reserveRes.forEach( async (element) => {
        await require('./Reservation').deleteOne({ _id: element._id});
    });
});

const Rooms = mongoose.model('rooms', schema);

module.exports = Rooms;