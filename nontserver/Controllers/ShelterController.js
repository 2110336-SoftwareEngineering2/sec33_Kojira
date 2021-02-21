"use strict";

const Shelters = require('../Models/Shelters');
const NontSitter = require("../Models/NontSitter");
const _ = require('lodash');
const Joi = require('joi');
const nontTypes = require('../Constants/nontTypes');
const JoiOid = require('joi-oid');

const validate_coordinate = Joi.object({
    lat:Joi.number().min(-90).max(90),
    lng:Joi.number().min(-180).max(180)
}).required();
const validate_license =Joi.object({
    name:Joi.string().required().min(0).max(32),
    img:Joi.binary().required()
});
const validate_image =Joi.object({
    name:Joi.string().required(),
    img:Joi.binary().required()
});
const validate_room =Joi.object({
    room_id:JoiOid.objectId().required()
});
const validator = Joi.object({
    name: Joi.string().required().min(1).max(50),
    description: Joi.string().max(500).allow(null,''), //allow null
    address: Joi.string().required().min(1).max(500),
    rate: Joi.number().min(0).max(5).required(),
    supported_type:Joi.array().items(Joi.string().valid(...Object.values(nontTypes))).allow(null), //delete required
    coordinate: validate_coordinate,
    phoneNumber: Joi.string() //allow null
    .allow(null,'')
    .length(10)
    .pattern(/^[0-9]+$/),
    license:Joi.array().items(validate_license), //required
    picture:Joi.array().items(validate_image), //required
    rooms:JoiOid.array().items(validate_room),
    nont_sitter_id:JoiOid.objectId()
});

const controller = {

    // GET
    getShelters: async (req,res) => {
        try{            
            const allShelters = await Shelters.find();
            if(Object.keys(allShelters).length===0)res.send(`there is no shelters`);
            return res.send(allShelters);
        }
        catch (error){
            return res.status(500).send('Cannot access Shelters');
        }
    },
    // GET Shelter BY ID
    getShelterByID:  async (req,res) => {
        try{            
            const Shelter = await Shelters.findById(req.params.id);
            return res.send(Shelter);
        }
        catch (error){
            return res.status(500).send('Cannot access shelter by id');
        }
    },
    // GET Shelter by nont_sitter_id
    getShelterByNontSitterID: async (req,res) => {
        try{            
            const Shelter = await Shelters.find({"nont_sitter_id":req.params.id});
            return res.send(Shelter);
        }
        catch (error){
            return res.status(500).send('Cannot access shelter by id');
        }
    },
    // GET Shelter BY NAME
    getShelterByName:  async (req,res) => {
        try{            
            const Shelter = await Shelters.find({"name": req.params.name});
            if(Object.keys(Shelter).length===0)res.send(`there is no shelter name ${req.params.name} `);
            return res.send(Shelter);
        }
        catch (error){
            return res.status(500).send('Cannot access shelter by name');
        }
    },
    // GET Shelter by email
    getShelterByEmail: async (req, res) => {
        try{            
            const Shelter = await Shelters.find({"nont_sitter_email": req.params.email});
            return res.send(Shelter);
        }
        catch (error){
            return res.status(500).send('Cannot access shelter by email');
        }
    },
        

    // POST add new shelter
    registerShelter: async (req, res) => {
        // req.body validation using joi
        const validationResult = validator.validate(req.body);
        if (validationResult.error){
            console.log(validationResult.error.details[0].message)
            return res.status(400).send(validationResult.error.details[0].message);
        }
        // no unique attribute -> do not check
        // create newShelter and save to db
        try{           
            const newBody = {
                ...req.body,
            };
            const newShelter = await Shelters.create(newBody);
            return res.send(_.pick(newShelter, ["_id","name","rate","phonenumber"]));
        }
        catch(error){
            return res.status(500).send("Cannot create room");
        }
    }
}

module.exports = controller;