"use strict";
const InterfaceController = require("./InterfaceController");

class RoomController extends InterfaceController {
    constructor() {
        super();
        this.ShelterController = require("./ShelterController.js");
        this.validator = this.joi.object({
            name: this.joi.string().required().min(1).max(50),
            amount: this.joi.number().integer().min(1).max(20),
            price: this.joi.number().integer().min(1).max(3000),
            nont_type: this.joi.string().valid(...Object.values(this.nontTypes)),
            shelter_id: this.joiOid.objectId(),
        });
    }

    // GET
    getRooms = async (req,res) => {
        try{            
            const allRooms = await this.Room.find();
            return res.send(allRooms);
        }
        catch (error){
            return res.status(500).send('Cannot access rooms');
        }
    }

    /*
    GET /room/id/:id
        field required: room_id
        (exist must be true)
        return: room
    */
    getRoomByID =  async (req,res) => {
        try {
            const roomRes = await this.Room.findById(req.params.id);
            if (!roomRes.exist) {
                return res.status(404).send("Room with this id is no longer exist.")
            }
            return res.send(roomRes);
        }
        catch (error) {
            return res.status(500).send('Cannot access rooms by id');
        }
    }

    /* 
    GET /room/shelterid/:id
        field required: shelter_id
        (exist must be true)
        return: room
    */
    getRoomByShelterID =  async (req,res) => {
        try{            
            const roomRes = await this.Room.find({ "shelter_id": req.params.id, "exist": true });
            return res.send(roomRes);
        }
        catch (error){
            return res.status(500).send('Cannot access rooms by shelter id');
        }
    }

    getRoomByName =  async (req,res) => {
        try{            
            const roomRes = await this.Room.find({"name": req.params.name});
            if(Object.keys(roomRes).length===0)res.send(`there is no room name ${req.params.name} `);
            return res.send(roomRes);
        }
        catch (error){
            return res.status(500).send('Cannot access rooms by name');
        }
    }
    getRoomByNontType =  async (req,res) => {
        try{            
            const roomRes = await this.Room.find({"nont_type": req.params.type});
            if(Object.keys(roomRes).length===0)res.send(`there is no room with ${req.params.type} type`);
            return res.send(roomRes);
        }
        catch (error){
            return res.status(500).send('Cannot access rooms by nont type');
        }
    }

    /* 
    POST / 
        field required: name, nont_type, amount, price, shelter_id
        (exist is true by default)
        return: created room with field [_id, name, nont_type, amount, price]
    */
    create = async (req, res) => {
        // req.body validation using joi
        const validationResult = this.validator.validate(req.body);
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
            const newRoom = await this.Room.create(newBody);
            // update supported_type   
            const updateSupportTypeRes = this.ShelterController.updateSupportedType(newRoom.shelter_id);
            return res.send(this._.pick(newRoom, ["_id","name","nont_type","amount","price"]));
        }
        catch(error){
            return res.status(500).send("Cannot create room");
        }     
    }

    /* 
    PATCH /room/update/:id
        field required: room_id
        field optional: name, nont_type, amount, price
        (shelter_id and exist should not be change with this method)
        return: updated room
    */
    updateRoom = async (req, res) => {
        const validationResult = this.validator.validate(req.body);
        if (validationResult.error) {            
            return res.status(400).send(validationResult.error.details[0].message);
        }
        try {
            const newBody = {
                ...req.body,
            }
            const updateRes = await this.Room.findByIdAndUpdate(
                req.params.id,
                { $set: newBody},
                { new: true }
            );            
            // update supported_type   
            const updateSupportTypeRes = this.ShelterController.updateSupportedType(updateRes.shelter_id);
            return res.send(updateRes);
        } 
        catch (error) {            
            return res.status(500).send("Cannot update room");
        }
    }

    /* 
    PATCH /room/delete/:id 
        field required: room_id
        return: updated room, the only field change is exist
    */
    deleteRoom = async (req, res) => {
        try {
            // check if there is incompleted reservation with this room_id
            const reserveRes = await this.Reservation.findOne({ "room_id": req.params.id, "status": {$in: ['payment-pending','paid','checked-in']} });
            if (reserveRes) {
                return res.status(400).send("Cannot delete room. Related reservtion is still not completed.");
            }
            // find shelter_id for update supported type
            const searchRes = await this.Room.findById(req.params.id);            
            // delete room -> change exist to false
            const newBody = {
                exist: false,
            };
            const updateRes = await this.Room.findByIdAndUpdate(
                req.params.id,
                { $set: newBody },
                { new: true }
            );            
            // update supported_type   
            const updateSupportTypeRes = this.ShelterController.updateSupportedType(searchRes.shelter_id);
            return res.send(updateRes);  
        }
        catch (error) {
            return res.status(500).send("Cannot delete room");
        }
    }

    //PUT
    adminUpdateRoom = async (req, res) => {
        try {
          const newQuery = {_id: req.params.id};
          const newBody = req.body;
          const updatedRoom = await this.Room.updateOne(newQuery, newBody);
          return res.send(newBody);
        }
        catch(error) {
          return res.status(500).send("Internal Server Error, Please try again");
        }
    }

    /* 
    DELETE /room/remove/:id 
        field required: room_id
        return: deleted result
    */
    remove = async (req, res) => {
        try {
            // check if there is incompleted reservation with this room_id
            const reserveRes = await this.Reservation.findOne({ "room_id": req.params.id, "status": {$in: ['payment-pending','paid','checked-in']} });
            if (reserveRes) {
                return res.status(400).send("Cannot delete room. Related reservtion is still not completed.");
            }
            // remove room
            const newQuery = { _id: this.mongoose.Types.ObjectId(req.params.id)};
            const deleted = await this.Room.deleteOne(newQuery);
            return res.send(deleted);
        }
        catch(error) {
            return res.status(500).send("Cannot remove room");
        }
    }
}

module.exports = new RoomController();