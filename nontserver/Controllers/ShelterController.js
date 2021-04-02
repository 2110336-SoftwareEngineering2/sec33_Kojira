"use strict";

const Rooms = require("../Models/Room");
const Shelters = require("../Models/Shelters");
const NontSitter = require("../Models/NontSitter");
const _ = require("lodash");
const Joi = require("joi");
const nontTypes = require("../Constants/nontTypes");
const JoiOid = require("joi-oid");
const mongoose = require("mongoose");
const geolib = require("geolib");

const validate_coordinate = Joi.object({
  lat: Joi.number().min(-90).max(90),
  lng: Joi.number().min(-180).max(180),
}).required();
const validate_license = Joi.object({
  name: Joi.string().required().min(0).max(32),
  img: Joi.binary().required(),
  contentType: Joi.string(),
});
const validate_image = Joi.object({
  name: Joi.string().required(),
  img: Joi.binary().required(),
  contentType: Joi.string(),
});
const validator = Joi.object({
  name: Joi.string().required().min(1).max(50),
  description: Joi.string().max(500).allow(null, ""), //allow null
  address: Joi.string().required().min(1).max(500),
  rate: Joi.number().min(0).max(5).required(),
  supported_type: Joi.array()
    .items(Joi.string().valid(...Object.values(nontTypes)))
    .allow(null), //delete required
  coordinate: validate_coordinate,
  phoneNumber: Joi.string() //allow null
    .allow(null, "")
    .length(10)
    .pattern(/^[0-9]+$/),
  license: Joi.array().items(validate_license), //required
  picture: Joi.array().items(validate_image), //required
  nont_sitter_id: JoiOid.objectId(),
});

const controller = {
  // GET
  getShelters: async (req, res) => {
    try {
      const allShelters = await Shelters.find();
      if (Object.keys(allShelters).length === 0)
        res.send(`there is no shelters`);
      return res.send(allShelters);
    } catch (error) {
      return res.status(500).send("Cannot access Shelters");
    }
  },

  // GET Shelter BY ID
  getShelterByID: async (req, res) => {
    try {
      const Shelter = await Shelters.findById(req.params.id);
      return res.send(Shelter);
    } catch (error) {
      return res.status(500).send("Cannot access shelter by id");
    }
  },

  // GET Shelter by nont_sitter_id
  getShelterByNontSitterID: async (req, res) => {
    try {
      const Shelter = await Shelters.find({ nont_sitter_id: req.params.id });
      return res.send(Shelter);
    } catch (error) {
      return res.status(500).send("Cannot access shelter by id");
    }
  },

  // GET Shelter BY NAME
  getShelterByName: async (req, res) => {
    try {
      const Shelter = await Shelters.find({ name: req.params.name });
      if (Object.keys(Shelter).length === 0)
        res.send(`there is no shelter name ${req.params.name} `);
      return res.send(Shelter);
    } catch (error) {
      return res.status(500).send("Cannot access shelter by name");
    }
  },

  // GET Shelter by email
  getShelterByEmail: async (req, res) => {
    try {
      const Shelter = await Shelters.find({
        nont_sitter_email: req.params.email,
      });
      return res.send(Shelter);
    } catch (error) {
      return res.status(500).send("Cannot access shelter by email");
    }
  },

  // GET /findShelters
  findShelters: async (req, res) => {
    function checkSupportedType(shelter, supportedTypeFilter) {
      if (supportedTypeFilter.length > 0) {
        const intersectedType = supportedTypeFilter.filter((type) =>
          shelter.supported_type.includes(type)
        );
        return intersectedType.length > 0;
      } else return true;
    }

    try {
      let foundShelters = await Shelters.find().lean().exec();
      try {
        // Get paramters
        const pageNumber = req.query.pageNumber
          ? Number(req.query.pageNumber)
          : 1;
        const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 20;
        const sortedBy = req.query.sortedBy ? req.query.sortedBy : "rate";
        const keywords = req.query.keywords ? req.query.keywords : "";
        const supported_type = req.query.supported_type
          ? Array.isArray(req.query.supported_type)
            ? req.query.supported_type
            : [req.query.supported_type]
          : [];
        const rate =
          req.query.minrate && req.query.maxrate
            ? [Number(req.query.minrate), Number(req.query.maxrate)]
            : [0, 5];
        const lat = req.query.lat;
        const lng = req.query.lng;
        const position =
          lat !== undefined && lng !== undefined
            ? { lat: lat, lng: lng }
            : undefined;

        // Validation
        const validTypes = Object.values(nontTypes);
        for (const type of supported_type) {
          if (!validTypes.includes(type))
            return res.status(400).send("Error: Invalid nont type");
        }

        // Filtering => Sorting => Pagination
        const re = new RegExp(keywords, "i");
        foundShelters = foundShelters.filter(
          (shelter) =>
            shelter.name.match(re) &&
            checkSupportedType(shelter, supported_type) &&
            shelter.rate >= rate[0] &&
            shelter.rate <= rate[1]
        );
        if (position) {
          foundShelters.map((shelter) => {
            shelter.distance = geolib.getDistance(
              { latitude: position.lat, longitude: position.lng },
              {
                latitude: shelter.coordinate.lat,
                longitude: shelter.coordinate.lng,
              }
            );
          });
        }
        if (sortedBy === "rate")
          foundShelters = _.sortBy(foundShelters, sortedBy).reverse();
        else foundShelters = _.sortBy(foundShelters, sortedBy);
        res.send(foundShelters);
      } catch (error) {
        return res.status(400).send("Error: Invalid query");
      }
    } catch (error) {
      return res.status(500).send("Cannot access shelters");
    }
  },

  // POST add new shelter
  registerShelter: async (req, res) => {
    // req.body validation using joi
    const validationResult = validator.validate(req.body);
    if (validationResult.error) {
      console.log(validationResult.error.details[0].message);
      return res.status(400).send(validationResult.error.details[0].message);
    }
    // no unique attribute -> do not check
    // create newShelter and save to db
    try {
      const newBody = {
        ...req.body,
      };
      const newShelter = await Shelters.create(newBody);
      return res.send(
        _.pick(newShelter, ["_id", "name", "rate", "phonenumber"])
      );
    } catch (error) {
      return res.status(500).send("Cannot create shelter");
    }
  },

  // PATCH /shelter
  updateShelter: async (req, res) => {
    try {
      const data = req.body;
      try {
        const Shelter = await Shelters.findByIdAndUpdate(
          data._id,
          { $set: data },
          { new: true }
        );
        return res.send(
          _.pick(Shelter, ["_id", "name", "rate", "phonenumber"])
        );
      } catch (error) {
        console.log(error);
        throw error;
      }
    } catch (error) {
      return res.status(500).send("Cannot access shelter.");
    }
  },

  // Update supported_type and
  // to call from other function in backend only
  updateSupportedType: async (shelterID) => {
    try {
      const nontTypes = await Rooms.find({ shelter_id: shelterID }).distinct(
        "nont_type"
      );
      const newQuery = {
        _id: shelterID,
      };
      const newBody = {
        supported_type: nontTypes,
      };
      const updateRes = await Shelters.updateOne(newQuery, newBody);
      return updateRes;
    } catch (error) {
      throw error;
    }
  },

  // DELETE shelter
  deleteShelter: async (req, res) => {
    try {
      const deletedShelter = await Shelters.findOneAndDelete({
        _id: req.params.id,
      });
      return res.send("Succesfully delete shelter");
    } catch (error) {
      return res.status(500).send("Cannot delete shelter");
    }
  },

  // Check exist name
  checkValidName: async (req, res) => {
    try {
      const nameFindResult = await Shelters.findOne({ name: req.body.name });
      if (nameFindResult) return res.send({ exist: true });
      else return res.send({ exist: false });
    } catch (error) {
      return res.status(500).send("Cannot access database.");
    }
  },
};

module.exports = controller;
