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
    nont_id: joiOid.objectId().required(),
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
            const nont = await Nont.findById(req.body.nont_id);
            const room = await Rooms.findById(req.body.room_id);
            const shelter = await Shelters.findById(room.shelter_id);

            const newBody = {
                ...req.body,
                nontowner_id: nont.nontowner_id,
                shelter_id: room.shelter_id,
                nontsitter_id: shelter.nontsitter_id,
                price: room.price,
                status: 'payment-pending',
                status_change_datetime: new Date(),
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
                const newUpdate = {$addToSet: {nontsitter_check_in:true, status:'checked-in', check_in_datetime: now, status_change_datetime: now}};
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
            if(now < reservation.start_datetime) return res.status(403).send("Cannot check in before the start time")
           
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
                const newUpdate = {$addToSet: {nontsitter_check_out:true, status:'checked-out', check_out_datetime: now, status_change_datetime: now}};
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
            if(now > reservation.end_datetime) return res.send("Fine payment is needed due to late check-out!")
           
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
            if(reservation.start_datetime < date.setDate(date.getDate()+1)) return res.status(403).send('Reservation cancel within 24 hours before start_datetime is not allowed');
            //check if the status is 'payment-pending'
            if(reservation.status === 'payment-pending'){
                const newQuery = {_id: mongoose.Types.ObjectId(req.params.id)}; //reservation id
                const newUpdate = {$addToSet: {status:'cancelled', status_change_datetime:now}};
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