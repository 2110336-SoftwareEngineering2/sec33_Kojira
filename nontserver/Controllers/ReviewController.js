"use strict";

const Review = require('../Models/Review');
const Reservation = require('../Models/Reservation');
const joi = require('joi');
const joiOid = require('joi-oid');
const mongoose = require('mongoose');

const ShelterController = require("./ShelterController.js");

const validator = joi.object({
    nontowner_id: joiOid.objectId().required(),
    shelter_id: joiOid.objectId().required(),
    reservation_id: joiOid.objectId().required(),
    rate: joi.number().min(0).max(5).required(),
    comment: joi.string().max(500),
});

const updateValidator = joi.object({
    _id: joiOid.objectId().required(),
    rate: joi.number().min(0).max(5).required(),
    comment: joi.string().max(500),
});

const controller = {
    // GET all
    getReviews: async (req,res) => {
        try {
            const allReviews = await Review.find();
            return res.send(allReviews);
        }
        catch (error) {
            return res.status(500).send('Cannot access reviews');
        }
    },
    getReviewByID: async (req,res) => {
        try {
            const review = await Review.findOne({_id: req.params.id});
            return res.send(review);
        }
        catch (error) {
            return res.status(500).send('Cannot access review by id');
        }
    },
    

    /* 
    POST /review
        create new review
        field required: nontowner_id, shelter_id, reservation_id, rate, comment
        (comment can be empty string but should have field)
        return review created 
    */
    createReview: async (req,res) => {
        const validationResult = validator.validate(req.body);
        if (validationResult.error) {
            return res.status(400).send(validationResult.error.details[0].message);
        }
        try {
            const newBody = {
                ...req.body,
            };
            // check if nontowner_id and shelter_id are consistant with reservation_id
            // for unique reservation_id is checking in database indices.
            const reserveResult = await Reservation.findById(newBody.reservation_id);
            if (!reserveResult.nontowner_id.equals(newBody.nontowner_id) || !reserveResult.shelter_id.equals(newBody.shelter_id) ) {
                return res.status(400).send("Cannot create review. reservation_id is not consistant with nontowner_id and shelter_id.");
            }
            // create new review
            const newReview = await Review.create(newBody);
            // update average rate
            const updateRateRes = ShelterController.updateRate(newReview.shelter_id);
            return res.send(newReview);
        }
        catch (error) {            
            return res.status(500).send("Cannot create review");
        }
    },

    // GET review by shelterID
    getReviewByShelterID: async (req,res) => {
        try{            
            const review = await Review.find({"shelter_id": req.params.id}) 
            .populate('nontowner_id').populate('reservation_id'); 
            return res.send(review);
        }
        catch (error){
            return res.status(500).send('Cannot get review by ShelterID');
        }
    },

    // GET review by reservationID
    getReviewByReservationID: async (req,res) => {
        try{            
            const review = await Review.find({"reservation_id": req.params.id}) 
            .populate('nontowner_id').populate('reservation_id').populate('shelter_id'); 
            return res.send(review);
        }
        catch (error){
            return res.status(500).send('Cannot get review by ReservationID');
        }
    },

    // GET review by nontOwnerID
    getReviewByNontOwnerID: async (req,res) => {
        try{            
            const review = await Review.find({"nontowner_id": req.params.id}) 
            .populate('nontowner_id').populate('reservation_id').populate('shelter_id'); 
            return res.send(review);
        }
        catch (error){
            return res.status(500).send('Cannot get review by NontOwnerID');
        }
    },

    /*
    PATCH /review
        update review
        field required: _id, rate, comment
        (_id is review_id, other id object should not be changed)
        return review after updated
    */
    updateReview: async (req,res) => {
        const validationResult = updateValidator.validate(req.body);
        if (validationResult.error) {
            return res.status(400).send(validationResult.error.details[0].message);
        }
        try {
            const newBody = {
                ...req.body,
            }
            const updateRes = await Review.findByIdAndUpdate(
                newBody._id,
                { $set: newBody},
                { new: true }
            );
            // update average rate
            const updateRateRes = ShelterController.updateRate(updateRes.shelter_id);
            return res.send(updateRes);
        }
        catch (error) {
            return res.status(500).send("Cannot update review");
        }
    },

    /*
    DELETE /review/remove/:id
        remove review
        field required: _id
        (_id is review_id)
        return: deleted result
    */
    removeReview: async (req,res) => {
        try {
            // search review
            const searchRes = await Review.findById(req.params.id);
            // delete review
            const deleteQuery = {_id: req.params.id};
            const deleteResult = await Review.deleteOne(deleteQuery);
            // update average rate
            const updateRateRes = ShelterController.updateRate(searchRes.shelter_id);
            return res.send(deleteResult);
        }
        catch (error) {
            return res.status(500).send('Cannot delete review');
        }
    },
    
}

module.exports = controller;