"use strict";

const express = require('express');
const router = express.Router();
const controller = require('../Controllers/RoomController');

// enum
const nontTypes = {
    LARGE_DOG: "large dog",
    MEDIUM_DOG: "medium dog",
    SMALL_DOG: "small dog",
    CAT: "cat",
    HAMSTER: "hamster",
    RABBIT: "rabbit",
    BIRD: "bird",
};

router
    .route('/')
    .get(controller.getRooms)
    .post(controller.registerRoom);

// test data
// const rooms = [
//     {
//         id: 1,
//         name: 'kojira room A',
//         nont_type: nontTypes.LARGE_DOG,
//         amount: 3,
//         price: 420,
//         reserved_date_time: [
//             {
//                 start_date_time: '2021-02-06 10:00:00',
//                 end_date_time: '2021-02-07 12:00:00'
//             }
//         ]
//     },
//     {
//         id: 2,
//         name: 'kojira room B',
//         nont_type: nontTypes.RABBIT,
//         amount: 1,
//         price: 210,
//         reserved_date_time: []
//     },
//     {
//         id: 3,
//         name: 'kojira room C',
//         nont_type: nontTypes.SMALL_DOG,
//         amount: 8,
//         price: 800,
//         reserved_date_time: [
//             {
//                 start_date_time: '2020-10-11 15:30:00',
//                 end_date_time: '2021-10-12 20:00:00'
//             },
//             {
//                 start_date_time: '2021-01-03 08:00:00',
//                 end_date_time: '2021-01-04 08:00:00'
//             }
//         ]
//     },
// // ]

// // Get All rooms
// router.get('/', (req, res) => {
//     res.json(rooms)
// })

// // Create room
// router.post('/add', (req, res) => {
//     const newRoom = {
//         ...req.body,
//         id: 5,
//         reserved_date_time: []
//     };

//     if (!newRoom.name || !newRoom.nont_type || !newRoom.amount || !newRoom.price){
//         return res.status(400).json({msg: 'Please fill all information'})
//     }

//     rooms.push(newRoom);
//     res.json(rooms);
// })

// Update room

// Delete room

module.exports = router;