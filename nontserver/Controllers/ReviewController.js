"use strict";

const Review = require('../Models/Review');
const joi = require('joi');
const joiOid = require('joi-oid');
const mongoose = require('mongoose');

const validator = joi.object({
    nontowner_id: joiOid.objectId().required(),
    shelter_id: joiOid.objectId().required(),
    reservation_id: joiOid.objectId().required(),
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

    // POST create new
    createReview: async (req,res) => {
        const validationResult = validator.validate(req.body);
        if (validationResult.error) {
            return res.status(400).send(validationResult.error.details[0].message);
        }
        try {
            const newBody = {
                ...req.body,
            };
            const newReview = await Review.create(newBody);
            console.log(newReview);
            return res.send(newReview);
        }
        catch (error) {            
            return res.status(500).send("Cannot create review");
        }
    },
}

module.exports = controller;