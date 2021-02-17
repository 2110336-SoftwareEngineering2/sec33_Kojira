"use strict";

const Rooms = require('../Models/Room');
const _ = require('lodash');
const Joi = require('joi');
const nontTypes = require('../Constants/nontTypes');

const validator = Joi.object({
    name: Joi.string().required().min(1).max(50),
    amount: Joi.number().integer().min(1).max(20),
    price: Joi.number().integer().min(1).max(3000),
    nont_type: Joi.string().valid(...Object.values(nontTypes))
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
                if(Object.keys(Room).length===0)res.send(`there is no room with ${req.params.id} id`);
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
        if (validationResult.error){
            return res.status(400).send(validationResult.error.details[0].message);
        }
        // no unique attribute -> do not check
        // create newRoom and save to db
        try{            
            const newBody = {
                ...req.body,
                reserved_date_time: []
            };
            const newRoom = await Rooms.create(newBody);
            return res.send(_.pick(newRoom, ["_id","name","nont_type","amount","price","phoneNumber"]));
        }
        catch(error){
            return res.status(500).send("Cannot create room");
        }
    }
}

module.exports = controller;