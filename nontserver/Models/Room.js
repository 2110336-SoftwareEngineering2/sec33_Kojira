"use strict";

const mongoose = require('mongoose');
const schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.objectId;

const schema = new Schema(
    {
        name: {type: String, required:true},
        nont_type: {type: String, required: true},
        amount: {type: Number, required: true},
        price: {type: Number, required: true},
        reserved_date_time: [
            {
                start_date_time: {type: Date},
                end_date_time: {type: Date}
            }
        ]
    },
    {
        timestamps: true,
        collection: 'rooms'
    }
);

const Rooms = mongoose.model('rooms', schema);

module.exports = Rooms;