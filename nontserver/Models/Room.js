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
        reserved_date_time: [
            {
                start_date_time: {type: Date},
                end_date_time: {type: Date}
            }
        ],
<<<<<<< Updated upstream
        shelter_id: {type: ObjectId, required: true, ref:"shelters"},
=======
        shelter_id: {type: ObjectId, required:true, ref:"shelters"},
>>>>>>> Stashed changes
    },
    {
        timestamps: true,
        collection: 'rooms'
    }
);

const Rooms = mongoose.model('rooms', schema);

module.exports = Rooms;