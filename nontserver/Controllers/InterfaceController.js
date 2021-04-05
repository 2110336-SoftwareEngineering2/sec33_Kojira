class InterfaceController {
    static Nont = require("../Models/Nont");
    constructor() {
        this.mongoose = require("mongoose");
        this.joi = require('joi');
        this.joiOid = require('joi-oid');
        this._ = require('lodash');
        this.bcrypt = require("bcryptjs");
        this.geolib = require('geolib');
    
        this.Nont = require("../Models/Nont");
        this.Reservation = require("../Models/Reservation");
        this.NontOwner = require("../Models/NontOwner");
        this.NontSitter = require("../Models/NontSitter");
        this.Shelter = require("../Models/Shelters");
        this.Room = require("../Models/Room");
        this.Review = require("../Models/Review");

        this.nontTypes = require('../Constants/nontTypes');
    }

    create = async (req,res) => {}
    remove = async (req,res) => {}

}

module.exports = InterfaceController;