"use strict";

const Rooms = require('../Models/Room');
const _ = require('lodash');
const Joi = require('joi');
const JoiOid = require('joi-oid');
const nontTypes = require('../Constants/nontTypes');
const mongoose = require("mongoose");
const ShelterController = require("./ShelterController.js");

const validator = Joi.object({
    name: Joi.string().required().min(1).max(50),
    amount: Joi.number().integer().min(1).max(20),
    price: Joi.number().integer().min(1).max(3000),
    nont_type: Joi.string().valid(...Object.values(nontTypes)),
    shelter_id: JoiOid.objectId(),
});

const controller = {

    // GET
    getRooms: async (req,res) => {
        try{            
            const allRooms = await Rooms.find();
            return res.send(allRooms);
        }
        catch (error){
            return res.status(500).send('Cannot access rooms');
        }
    },

    /*
    GET /room/id/:id
        field required: room_id
        (exist must be true)
        return: room
    */
    getRoomByID:  async (req,res) => {
        try {
            const Room = await Rooms.findById(req.params.id);
            if (!Room.exist) {
                return res.status(404).send("Room with this id is no longer exist.")
            }
            return res.send(Room);
        }
        catch (error) {
            return res.status(500).send('Cannot access rooms by id');
        }
    },

    /* 
    GET /room/shelterid/:id
        field required: shelter_id
        (exist must be true)
        return: room
    */
    getRoomByShelterID:  async (req,res) => {
        try{            
            const Room = await Rooms.find({ "shelter_id": req.params.id, "exist": true });
            return res.send(Room);
        }
        catch (error){
            return res.status(500).send('Cannot access rooms by shelter id');
        }
    },

    getRoomByName:  async (req,res) => {
        try{            
            const Room = await Rooms.find({"name": req.params.name});
            if(Object.keys(Room).length===0)res.send(`there is no room name ${req.params.name} `);
            return res.send(Room);
        }
        catch (error){
            return res.status(500).send('Cannot access rooms by name');
        }
    },
    getRoomByNontType:  async (req,res) => {
        try{            
            const Room = await Rooms.find({"nont_type": req.params.type});
            if(Object.keys(Room).length===0)res.send(`there is no room with ${req.params.type} type`);
            return res.send(Room);
        }
        catch (error){
            return res.status(500).send('Cannot access rooms by nont type');
        }
    },

    /* 
    POST / 
        field required: name, nont_type, amount, price, shelter_id
        (exist is true by default)
        return: created room with field [_id, name, nont_type, amount, price]
    */
    registerRoom: async (req, res) => {
        // req.body validation using joi
        const validationResult = validator.validate(req.body);
        console.log(validationResult);
        if (validationResult.error){
            return res.status(400).send(validationResult.error.details[0].message);
        }
        // no unique attribute -> do not check
        // create newRoom and save to db
        try{            
            const newBody = {
                ...req.body,
                exist: true,
            };
            const newRoom = await Rooms.create(newBody);
            // update supported_type   
            const updateSupportTypeRes = ShelterController.updateSupportedType(newRoom.shelter_id);
            return res.send(_.pick(newRoom, ["_id","name","nont_type","amount","price"]));
        }
        catch(error){
            return res.status(500).send("Cannot create room");
        }     
    },

    /* 
    PATCH /room/update/:id
        field required: room_id
        field optional: name, nont_type, amount, price
        (shelter_id and exist should not be change with this method)
        return: updated room
    */
    updateRoom: async (req, res) => {
        const validationResult = validator.validate(req.body);
        if (validationResult.error) {            
            return res.status(400).send(validationResult.error.details[0].message);
        }
        try {
            const newBody = {
                ...req.body,
            }
            const updateRes = await Rooms.findByIdAndUpdate(
                req.params.id,
                { $set: newBody},
                { new: true }
            );            
            // update supported_type   
            const updateSupportTypeRes = ShelterController.updateSupportedType(updateRes.shelter_id);
            return res.send(updateRes);
        } 
        catch (error) {            
            return res.status(500).send("Cannot update room");
        }
    },

    /* 
    DELETE /room/delete/:id 
        field required: room_id
        return: updated room, the only field change is exist
    */
    deleteRoom: async (req, res) => {
        // find shelter_id for update supported type
        // delete room -> change exist to false
        // update supported type
        try{
            const searchRes = await Rooms.findById(req.params.id);
            const newBody = {
                exist: false,
            };
            const updateRes = await Rooms.findByIdAndUpdate(
                req.params.id,
                { $set: newBody },
                { new: true }
            );            
            // update supported_type   
            const updateSupportTypeRes = ShelterController.updateSupportedType(searchRes.shelter_id);
            return res.send(updateRes);  
        }
        catch (error) {
            return res.status(500).send("Cannot delete room");
        }
    },
}

module.exports = controller;