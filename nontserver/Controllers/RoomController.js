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
    // GET ROOM BY ID
    getRoomByID:  async (req,res) => {
        try{            
            const Room = await Rooms.findById(req.params.id);
            return res.send(Room);
        }
        catch (error){
            return res.status(500).send('Cannot access rooms by id');
        }
    },
    // GET ROOM BY shelter id
    getRoomByShelterID:  async (req,res) => {
        try{            
            const Room = await Rooms.find({"shelter_id":req.params.id});
            return res.send(Room);
        }
        catch (error){
            return res.status(500).send('Cannot access rooms by id');
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

    // POST add new room
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
            };
            const newRoom = await Rooms.create(newBody);
            const updateSupportTypeRes = ShelterController.updateSupportedType(newRoom.shelter_id);
            return res.send(_.pick(newRoom, ["_id","name","nont_type","amount","price"]));
        }
        catch(error){
            return res.status(500).send("Cannot create room");
        }
        // update supported_type        
    },

    // PUT update room
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
            const updateSupportTypeRes = ShelterController.updateSupportedType(updateRes.shelter_id);
            return res.send(updateRes);    
        } 
        catch (error) {            
            return res.status(500).send("Cannot create room");
        }
    },

    // DELETE room /room/delete/:id
    deleteRoom: async (req, res) => {
        try{
            const deleteResult = await Rooms.deleteOne(req.params.id);
            return res.send(deleteResult);
        }
        catch (error) {
            return res.status(500).send("Cannot delete room");
        }
    },
}

module.exports = controller;