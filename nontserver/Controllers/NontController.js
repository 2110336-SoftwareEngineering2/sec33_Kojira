"use strict";

const nontTypes = require('../Constants/nontTypes');
const Nont = require('../Models/Nont');
const _ = require('lodash');
//const extension = require('joi-date-extensions');
const joi = require('joi');
const joiOid = require('joi-oid');
const mongoose = require('mongoose');

const validate_certificate = joi.object({
    name: joi.string().required(),
    img: joi.binary().required()
});

const validate_picture = joi.object({
    img: joi.binary().required()
});

//validator for POST and PUT
const validator = joi.object({
    name: joi.string().required().min(1).max(32),
    type: joi.string().valid(...Object.values(nontTypes)).required(),
    subtype: joi.string().optional().allow('').max(50),
    description: joi.string().optional().allow('').max(500),
   // birth_date: joi.date().valid('YYYY-MM-DD').required(),
    birth_date: joi.date().required(),
   // birth_date: joi.string().regex(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/).required(),
    medical_certificate: joi.array().items(validate_certificate),
    picture: joi.array().items(validate_picture),
    nontowner_id: joiOid.objectId().required()
});

const controller = {
    // GET
    getNonts: async (req,res) => {
        try{            
            const allNonts = await Nont.find();
            return res.send(allNonts);
        }
        catch (error){
            return res.status(500).send('Cannot access nonts');
        }
    },
    // GET NONT BY ID : maybe not need
    getNontByID:  async (req,res) => {
        try{            
            const nont = await Nont.findById(req.params.id);
          //  if(nont === null) return res.send(`there is no nont with id: ${req.params.id}`);
            return res.send(nont);
        }
        catch (error){
            return res.status(500).send('Cannot access nont by id');
        }
    },
    //GET NONT BY NAME 
    getNontByName:  async (req,res) => {
        try{            
            const nont = await Nont.find({"name": req.params.name});
            //if(Object.keys(nont).length === 0) return res.send(`there is no nont with name: ${req.params.name}`);
            return res.send(nont);
        }
        catch (error){
            return res.status(500).send('Cannot access nonts by name');
        }
    },
    getNontByType:  async (req,res) => {
        try{            
            const nont = await Nont.find({"type": req.params.type});
          //  if(Object.keys(nont).length === 0) return res.send(`there is no nont with type: ${req.params.type}`);
            return res.send(nont);
        }
        catch (error){
            return res.status(500).send('Cannot access nonts by type');
        }
    },
    getNontByNontOwnerID:  async (req,res) => {
        try{            
            const nont = await Nont.find({"nontowner_id": req.params.id});
           // if(Object.keys(nont).length === 0) return res.send(`there is no nont with nontowner_id: ${req.params.id}`);
            return res.send(nont);
        }
        catch (error){
            return res.status(500).send('Cannot access nonts by type');
        }
    },
    // POST create new nont
    createNont: async (req, res) => {
        // req.body validation using joi
        const validationResult = validator.validate(req.body);
        console.log(validationResult);
        if (validationResult.error){
            return res.status(400).send(validationResult.error.details[0].message);
        }
        // no unique attribute -> do not check
        // create new Nont and save to db
        try{
            const newBody = {
                name: req.body.name,
                type: req.body.type,
                subtype: req.body.subtype,
                description: req.body.description,
                birth_date: req.body.birth_date.split("T")[0],
                medical_certificate: req.body.medical_certificate,
                picture: req.body.picture,
                nontowner_id: mongoose.Types.ObjectId(req.body.nontowner_id)           
            };
            const newNont = await Nont.create(newBody);
         //   return res.send(_.pick(newNont, ["_id","name","type","subtype","description","birth_date","medical_certificate","picture"]));
            return res.send(newNont);
        }
        catch(error){
            console.log(error.message);
            return res.status(500).send("Cannot create nont");
        }
    },

    // PUT update nont
    updateNont: async (req, res) => {
        const validationResult = validator.validate(req.body);
        if (validationResult.error) {         
            console.log(validationResult.error);   
            return res.status(400).send(validationResult.error.details[0].message);
        }
        try{
            const newQuery = {_id: mongoose.Types.ObjectId(req.params.id)};
            const newBody = {
                name: req.body.name,
                type: req.body.type,
                subtype: req.body.subtype,
                description: req.body.description,
                birth_date: req.body.birth_date.split("T")[0],
                medical_certificate: req.body.medical_certificate,
                picture: req.body.picture,
                nontowner_id: mongoose.Types.ObjectId(req.body.nontowner_id)   
            };
            const updatedNont = await Nont.updateOne(newQuery, newBody);
         //   return res.send(_.pick(updatedNont, ["_id","name","type","subtype","description","birth_date","medical_certificate","picture"]));
            return res.send(updatedNont);
        } 
        catch (error) {            
            return res.status(500).send("Cannot update nont");
        }
    },
 
    //DELETE nont
    deleteNont: async (req, res) => {
        try{
            const newQuery = { _id: mongoose.Types.ObjectId(req.params.id)};
            const deletedNont = await Nont.deleteOne(newQuery);
            return res.send("Successfully deleted");
        }
        catch(error){
            return res.status(500).send("Cannot delete nont");
        }
    },
    
}

module.exports = controller;