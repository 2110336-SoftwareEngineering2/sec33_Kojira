"use strict";

const nontTypes = require('../Constants/nontTypes');
const Nont = require('../Models/Nont');
const _ = require('lodash');
const joi = require('joi');
const joiOid = require('joi-oid');

const validate_certificate = joi.object({
    name: joi.string().required().min(0).max(32),
    img: joi.binary().required()
});

const validate_picture = joi.object({
    img: joi.binary().required()
});

const validator = joi.object({
    name: joi.string().required().min(1).max(32),
    type: joi.string().valid(...Object.values(nontType)).required(),
    subtype: joi.string().min(1).max(50),
    description: joi.string().min(1).max(500),
    birth_date: joi.date().format('YYYY-MM-DD').raw().required(),
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
            if(Object.keys(nont).length === 0) return res.send(`there is no nont with id: ${req.params.id}`);
            else return res.send(nont);
        }
        catch (error){
            return res.status(500).send('Cannot access nont by id');
        }
    },
    //GET NONT BY NAME 
    getNontByName:  async (req,res) => {
        try{            
            const nont = await Nont.find({"name": req.params.name});
            if(Object.keys(nont).length === 0) return res.send(`there is no nont with name: ${req.params.name}`);
            else return res.send(nont);
        }
        catch (error){
            return res.status(500).send('Cannot access nonts by name');
        }
    },
    getNontByType:  async (req,res) => {
        try{            
            const nont = await Nont.find({"type": req.params.type});
            if(Object.keys(nont).length === 0) return res.send(`there is no nont with type: ${req.params.type}`);
            else return res.send(nont);
        }
        catch (error){
            return res.status(500).send('Cannot access nonts by type');
        }
    },

    // POST create new nont
    registerNont: async (req, res) => {
        // req.body validation using joi
        const validationResult = validator.validate(req.body);
        console.log(validationResult);
        if (validationResult.error){
            return res.status(400).send(validationResult.error.details[0].message);
        }
        // no unique attribute -> do not check
        // create new Nont and save to db
        try{
            const newQuery = {
                name: req.body.name, 
                nontowner_id: req.body.nontowner_id
            };
            const duplicateNont = await Nont.find(newQuery);
            if(Object.keys(duplicateNont).length === 0) return res.status(403).send('This name is used, please try another name');

            const newBody = {
                ...req.body
            };
            const newNont = await Nont.create(newBody);
            return res.send(_.pick(newNont, ["_id","name","type","subtype","description","birth_date","medical_certificate","picture"]));
        }
        catch(error){
            return res.status(500).send("Cannot create nont");
        }
    },

    // PUT update nont
    updateNont: async (req, res) => {
        const validationResult = validator.validate(req.body);
        console.log(validationResult);
        if (validationResult.error) {            
            return res.status(400).send(validationResult.error.details[0].message);
        }
        try {
            const newQuery = { //ในการ update จะไม่เปลี่ยน name, nontowner_id อยู่แล้ว 
                nontowner_id: req.body.nontowner_id,
                name: req.body.name //เพื่อให้ query นั้น unique ต้องมีทั้ง nontowner_id และ nont name
            };
            const newBody = {
                ...req.body,
            };
            const updatedNont = await Nont.updateOne(newQuery, newBody);
            return res.send(_.pick(updatedNont, ["_id","name","type","subtype","description","birth_date","medical_certificate","picture"]));
        } 
        catch (error) {            
            return res.status(500).send("Cannot update nont");
        }
    },
 
    //DELETE nont
    deleteNont: async (req, res) => {
        const validationResult = validator.validate(req.body);
        console.log(validationResult);
        if (validationResult.error) {            
            return res.status(400).send(validationResult.error.details[0].message);
        }
        try{
            const newQuery = {
                nontowner_id: req.body.nontowner_id,
                name: req.body.name
            };
            const deletedNont = await Nont.deleteOne(newQuery);
        }
        catch(error){
            return res.status(500).send("Cannot delete nont");
        }
    },
    
}