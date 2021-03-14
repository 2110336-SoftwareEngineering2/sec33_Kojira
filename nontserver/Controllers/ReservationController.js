"use strict";

const Reservation = require('../Models/Reservation');
const _ = require('lodash');
const joi = require('joi');
const joiOid = require('joi-oid');
const mongoose = require('mongoose');
const Nont = require('../Models/Nont');
const Rooms = require('../Models/Room');
const Shelters = require('../Models/Shelters');

const validator = joi.object({
    nont_id: joi.array().items(joiOid.objectId()).required(),
    //nontowner_id: joiOid.objectId().required(),
    room_id: joiOid.objectId().required(),
    //shelter_id: joiOid.objectId().required(),
    //nontsitter_id: joiOid.objectId().required(),
    start_datetime: joi.date().required(),
    end_datetime: joi.date().required(),
    //price: joi.number().integer().min(1).max(3000).required(),
    //status: joi.string().valid('payment-pending','paid','checked-in','checked-out','closed','cancelled').required(),
    //status_change_datetime: joi.date().required(),
    //transaction_id: joiOid.objectId(),
    //check_in_datetime: joi.date(),
    //check_out_datetime: joi.date(),
    //nontsitter_check_in: joi.boolean().required(),
    //nontsitter_check_out: joi.boolean().required(),
    //nontowner_check_in: joi.boolean().required(),
    //nontowner_check_out: joi.boolean().required()
});


const controller = {
    // GET 
    getReservationByNontOwnerID:  async (req,res) => {
        try{            
            const reservation = await Reservation.find({"nontowner_id": req.params.id}); //nont owner id
            return res.send(reservation);
        }
        catch (error){
            return res.status(500).send('Cannot access reservation by nontowner id');
        }
    },
    getReservationByNontSitterID: async (req, res) => {
        try{            
            const reservation = await Reservation.find({"nontsitter_id": req.params.id}); //nont sitter id
            return res.send(reservation);
        }
        catch (error){
            return res.status(500).send('Cannot access reservation by nontsitter id');
        }
    },
    getReservationByShelterID: async (req, res) => {
        try{            
            const reservation = await Reservation.find({"shelter_id": req.params.id}); //shelter id
            return res.send(reservation);
        }
        catch (error){
            return res.status(500).send('Cannot access reservation by shelter id');
        }
    },

    // POST create new reservation
    createReservation: async (req, res) => {
        const validationResult = validator.validate(req.body);
        console.log(validationResult);
        if (validationResult.error){
            return res.status(400).send(validationResult.error.details[0].message);
        }
        try{
            const now = new Date();
            //check if start_datetime must less than end_datetime
            if(req.body.end_datetime <= req.body.start_datetime) return res.status(403).send("start/end datetime is invalid");
           
            const room = await Rooms.findById(req.body.room_id);
            //check if the number of nont doens't exceed the room capacity (room.amount)
            if((req.body.nont_id).length > room.amount) return res.status(403).send('The room capacity is not enough for all nonts');

            //check if the supported nont type of room matches with the type of nont
            let nont;
            for(const element of req.body.nont_id){
                nont = await Nont.findById(element);
                if(nont.type !== room.nont_type) return res.status(403).send('Nont type of some nonts is not supported for the room');
            }

            //cancel all reservations that are not paid within 1 day (PUT update status:cancelled)
            const newQuery = {status:'payment-pending', status_change_datetime: {$lt:new Date(now.getTime()-1000*3600*24)} };
            const newUpdate = {$addToSet: {status:'cancelled', status_change_datetime:now.toString()}}; 
            await Reservation.updateMany(newQuery, newUpdate);

            //check if the selected nont room is available at the time by looping reservation
            const sameRoom = await Reservation.find({room_id: req.body.room_id});
            for(const element of sameRoom){
                if(element.status !== 'closed' && element.status !== 'cancelled') {
                    if((new Date(req.body.start_datetime).toString()>=element.start_datetime && new Date(req.body.start_datetime).toString()<=element.end_datetime) 
                    || (new Date(req.body.end_datetime).toString()>=element.start_datetime && new Date(req.body.end_datetime).toString()<=element.end_datetime)){
                        return res.status(403).send('The room is not available in this period of time');
                    }
                }
            }

            const shelter = await Shelters.findById(room.shelter_id);
            //const firstNont = await Nont.findById((req.body.nont_id)[0]);

            const newBody = {
                nont_id: req.body.nont_id,
                nontowner_id: nont.nontowner_id,
                room_id: req.body.room_id,
                shelter_id: room.shelter_id,
                nontsitter_id: shelter.nont_sitter_id,
                start_datetime: new Date(req.body.start_datetime).toString(),
                end_datetime: new Date(req.body.end_datetime).toString(),
                price: room.price,
                status: 'payment-pending',
                status_change_datetime: now.toString(),
                nontsitter_check_in: false,
                nontsitter_check_out: false,
                nontowner_check_in: false,
                nontowner_check_out: false
            };
            const newReservation = await Reservation.create(newBody);
            return res.send(newReservation);
        }
        catch(error){
            console.log(error.message);
            return res.status(500).send("Cannot create reservation");
        }
    },

    // PUT update status
    nontSitterCheckIn: async (req, res) => {
        try{
            const reservation = await Reservation.findById(req.params.id); //reservation id
            const now = new Date();
            //check if nontowner check in? to verify check in (done by nont sitter)
            if(reservation.nontowner_check_in === true) {
                const newQuery = {_id: mongoose.Types.ObjectId(req.params.id)}; //reservation id
                const newUpdate = {$addToSet: {nontsitter_check_in:true, status:'checked-in', check_in_datetime: now.toString(), status_change_datetime: now.toString()}};
                const updatedReservation = await Reservation.updateOne(newQuery,newUpdate);
                return res.send(updatedReservation);      
            } else return res.status(403).send("Cannot verify check-in because nontowner still doesn't check in nont");

        } 
        catch (error) {            
            return res.status(500).send("Cannot verify check-in");
        }
    },
 
    nontOwnerCheckIn: async (req, res) => {
        try{
            const reservation = await Reservation.findById(req.params.id); //reservation id
            const now = new Date();
            //check moment time >= start date time ?
            if(now.toString() < reservation.start_datetime) return res.status(403).send("Cannot check in before the start time")
           
            //check the status is "paid"?
            if(reservation.status === 'paid') {
                const newQuery = {_id: mongoose.Types.ObjectId(req.params.id)}; //reservation id
                const newUpdate = {$addToSet: {nontowner_check_in:true}};
                const updatedReservation = await Reservation.updateOne(newQuery,newUpdate);
                return res.send(updatedReservation);      
            } else return res.status(403).send("Cannot check in because the reservation is not paid");
        } 
        catch (error) {            
            return res.status(500).send("Cannot check in");
        }
    },

    nontSitterCheckOut: async (req, res) => {
        try{
            const reservation = await Reservation.findById(req.params.id); //reservation id
            const now = new Date();
            //check if nontowner check out? to verify check out (done by nont sitter)
            if(reservation.nontowner_check_out === true) {
                const newQuery = {_id: mongoose.Types.ObjectId(req.params.id)}; //reservation id
                const newUpdate = {$addToSet: {nontsitter_check_out:true, status:'checked-out', check_out_datetime: now.toString(), status_change_datetime: now.toString()}};
                const updatedReservation = await Reservation.updateOne(newQuery,newUpdate);
                return res.send(updatedReservation);      
            } else return res.status(403).send("Cannot verify check-out because nontowner still doesn't check out nont");

        } 
        catch (error) {            
            return res.status(500).send("Cannot verify check-out");
        }
    },
 
    nontOwnerCheckOut: async (req, res) => {
        try{
            const reservation = await Reservation.findById(req.params.id); //reservation id
            const now = new Date();
            //check moment time <= end date time ?
            if(now.toString() > reservation.end_datetime) return res.send("Fine payment is needed due to late check-out!")
           
            //check the status is "checked-in"?
            if(reservation.status === 'checked-in') {
                const newQuery = {_id: mongoose.Types.ObjectId(req.params.id)}; //reservation id
                const newUpdate = {$addToSet: {nontowner_check_out:true}};
                const updatedReservation = await Reservation.updateOne(newQuery,newUpdate);
                return res.send(updatedReservation);      
            } else return res.status(403).send("Cannot check out because nont owner still doesn't check-in nont");
        } 
        catch (error) {            
            return res.status(500).send("Cannot check out");
        }
    },

    //DELETE (but actually does not delete record from db, just change the status:cancelled)
    cancelReservation: async (req, res) => {
        try{
            const reservation = await Reservation.findById(req.params.id); //reservation id
            const now = new Date();
            const date = new Date();
            //check if cancel at least 24hours before start_datetime
            if(reservation.start_datetime < date.setDate(date.getDate()+1).toString()) return res.status(403).send('Reservation cancel within 24 hours before start_datetime is not allowed');
            //check if the status is 'payment-pending'
            if(reservation.status === 'payment-pending'){
                const newQuery = {_id: mongoose.Types.ObjectId(req.params.id)}; //reservation id
                const newUpdate = {$addToSet: {status:'cancelled', status_change_datetime:now.toString()}};
                const updatedReservation = await Reservation.updateOne(newQuery,newUpdate);
                res.send(updatedReservation);      
            } else return res.status(403).send("Cannot cancel because the reservation is paid");
        }
        catch(error){
            return res.status(500).send("Cannot cancel reservation");
        }
    },

    // //use this bottom if we actually want to delete record instead of cancel it  
    // deleteReservation: async (req, res) => {
    //     try{
    //         const reservation = await Reservation.findById(req.params.id); //reservation id
    //         if(reservation.status === 'payment-pending'){
    //             const newQuery = { _id: mongoose.Types.ObjectId(req.params.id)}; //reservation id
    //             const deletedReservation = await Reservation.deleteOne(newQuery);
    //             return res.send("Successfully deleted");
    //         }else return res.status(403).send("Cannot delete because the reservation is paid")
    //     }
    //     catch(error){
    //         return res.status(500).send("Cannot delete reservation");
    //     }
    // },
    
}

module.exports = controller;