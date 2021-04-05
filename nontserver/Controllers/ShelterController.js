"use strict";
const InterfaceController = require("./InterfaceController");

class ShelterController extends InterfaceController {
  constructor() {
    super();
    this.validate_coordinate = this.joi
      .object({
        lat: this.joi.number().min(-90).max(90),
        lng: this.joi.number().min(-180).max(180),
      })
      .required();
    this.validate_license = this.joi.object({
      name: this.joi.string().required().min(0).max(32),
      img: this.joi.binary().required(),
      contentType: this.joi.string(),
    });
    this.validate_image = this.joi.object({
      name: this.joi.string().required(),
      img: this.joi.binary().required(),
      contentType: this.joi.string(),
    });
    this.validator = this.joi.object({
      name: this.joi.string().required().min(1).max(50),
      description: this.joi.string().max(500).allow(null, ""), //allow null
      address: this.joi.string().required().min(1).max(500),
      rate: this.joi.number().min(0).max(5).required(),
      supported_type: this.joi
        .array()
        .items(this.joi.string().valid(...Object.values(this.nontTypes)))
        .allow(null), //delete required
      coordinate: this.validate_coordinate,
      phoneNumber: this.joi
        .string() //allow null
        .allow(null, "")
        .length(10)
        .pattern(/^[0-9]+$/),
      license: this.joi.array().items(this.validate_license), //required
      picture: this.joi.array().items(this.validate_image), //required
      nont_sitter_id: this.joiOid.objectId(),
    });
  }

  // GET all shelters
  getAllShelters = async (req, res) => {
    try {
      const allShelters = await this.Shelter.find();
      return res.send(allShelters);
    } catch (error) {
      return res.status(500).send("Cannot access Shelters");
    }
  };

  // GET
  getShelters = async (req, res) => {
    try {
      const allShelters = await this.Shelter.find({ exist: true });
      if (Object.keys(allShelters).length === 0)
        res.send(`there is no shelters`);
      return res.send(allShelters);
    } catch (error) {
      return res.status(500).send("Cannot access Shelters");
    }
  };
  // GET Shelter BY ID
  getShelterByID = async (req, res) => {
    try {
      const shelterRes = await this.Shelter.findById(req.params.id);
      if (!shelterRes.exist) {
        return res.status(404).send("Shelter with this id is no longer exist.");
      }
      return res.send(shelterRes);
    } catch (error) {
      return res.status(500).send("Cannot access shelter by id");
    }
  };
  // GET Shelter by nont_sitter_id
  getShelterByNontSitterID = async (req, res) => {
    try {
      const shelterRes = await this.Shelter.find({
        nont_sitter_id: req.params.id,
        exist: true,
      });
      return res.send(shelterRes);
    } catch (error) {
      return res.status(500).send("Cannot access shelter by id");
    }
  };
  // GET Shelter BY NAME
  getShelterByName = async (req, res) => {
    try {
      const shelterRes = await this.Shelter.find({
        name: req.params.name,
        exist: true,
      });
      if (Object.keys(shelterRes).length === 0)
        res.send(`there is no shelter name ${req.params.name} `);
      return res.send(shelterRes);
    } catch (error) {
      return res.status(500).send("Cannot access shelter by name");
    }
  };
  // GET Shelter by email ?
  getShelterByEmail = async (req, res) => {
    try {
      const shelterRes = await this.Shelter.find({
        nont_sitter_email: req.params.email,
      });
      return res.send(shelterRes);
    } catch (error) {
      return res.status(500).send("Cannot access shelter by email");
    }
  };

  // GET /findShelters
  findShelters = async (req, res) => {
    function checkSupportedType(shelter, supportedTypeFilter) {
      if (supportedTypeFilter.length > 0) {
        const intersectedType = supportedTypeFilter.filter((type) =>
          shelter.supported_type.includes(type)
        );
        return intersectedType.length > 0;
      } else return true;
    }

    try {
      let foundShelters = await this.Shelter.find().lean().exec();
      try {
        // Get paramters
        const sortedBy = req.query.sortedBy ? req.query.sortedBy : "rate";
        const keywords = req.query.keywords ? req.query.keywords : "";
        const supported_type = req.query.supported_type
          ? Array.isArray(req.query.supported_type)
            ? req.query.supported_type
            : [req.query.supported_type]
          : [];
        const minRate = req.query.minRate
          ? Math.min(Math.max(Number(req.query.minRate), 0), 5)
          : 0;
        const maxDistance = req.query.maxDistance
          ? Math.max(Math.min(Number(req.query.maxDistance), 100), 1)
          : 100;
        const nontAmount = req.query.nontAmount
          ? Math.min(Math.max(Number(req.query.nontAmount), 1), 20)
          : 1;
        const maxPrice = req.query.maxPrice
          ? Math.max(Math.min(Number(req.query.maxPrice), 3000), 0)
          : 3000;
        const lat = req.query.lat;
        const lng = req.query.lng;
        const position =
          lat !== undefined && lng !== undefined
            ? { lat: lat, lng: lng }
            : undefined;

        // Validation
        const validTypes = Object.values(this.nontTypes);
        for (const type of supported_type) {
          if (!validTypes.includes(type))
            return res.status(400).send("Error: Invalid nont type");
        }

        // Calculate distance
        if (position) {
          foundShelters.map((shelter) => {
            shelter.distance = this.geolib.getDistance(
              { latitude: position.lat, longitude: position.lng },
              {
                latitude: shelter.coordinate.lat,
                longitude: shelter.coordinate.lng,
              }
            );
          });
        }

        // Filter
        const re = new RegExp(keywords, "i");
        foundShelters = foundShelters.filter(
          (shelter) =>
            shelter.name.match(re) &&
            checkSupportedType(shelter, supported_type) &&
            shelter.rate >= minRate &&
            (!position ||
              shelter.distance <= maxDistance * 1000 ||
              maxDistance === 100)
        );
        for (const shelter of foundShelters) {
          const rooms = await this.Room.find({ shelter_id: shelter._id })
            .lean()
            .exec();
          const matchedRooms = rooms.filter(
            (room) =>
              (supported_type.includes(room.nont_type) ||
                supported_type.length === 0) &&
              room.amount >= nontAmount &&
              room.price <= maxPrice
          );
          let totalPrice = 0;
          let shelterMinPrice = 3000;
          let shelterMaxPrice = 0;
          for (const room of matchedRooms) {
            totalPrice = totalPrice + room.price;
            if (room.price < shelterMinPrice) shelterMinPrice = room.price;
            if (room.price > shelterMaxPrice) shelterMaxPrice = room.price;
          }
          shelter.avgPrice = totalPrice / matchedRooms.length;
          shelter.minPrice = shelterMinPrice;
          shelter.maxPrice = shelterMaxPrice;
          if (matchedRooms.length > 0) shelter.found = true;
        }
        foundShelters = foundShelters.filter(
          (shelter) => shelter.found && shelter.exist
        );

        // Sort
        if (sortedBy === "rate")
          foundShelters = this._.sortBy(foundShelters, sortedBy).reverse();
        else foundShelters = this._.sortBy(foundShelters, sortedBy);

        res.send(foundShelters);
      } catch (error) {
        console.log(error);
        return res.status(400).send("Error: Invalid query");
      }
    } catch (error) {
      return res.status(500).send("Cannot access shelters");
    }
  };

  // POST add new shelter
  create = async (req, res) => {
    // req.body validation using joi
    const validationResult = this.validator.validate(req.body);
    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    }
    // no unique attribute -> do not check
    // create newShelter and save to db
    try {
      const newBody = {
        ...req.body,
        exist: true,
      };
      const newShelter = await this.Shelter.create(newBody);
      return res.send(
        this._.pick(newShelter, ["_id", "name", "rate", "phonenumber"])
      );
    } catch (error) {
      return res.status(500).send("Cannot create shelter");
    }
  };

  // PATCH /shelter
  updateShelter = async (req, res) => {
    try {
      const data = req.body;
      try {
        const Shelter = await this.Shelter.findByIdAndUpdate(
          data._id,
          { $set: data },
          { new: true }
        );
        return res.send(
            this._.pick(Shelter, ["_id", "name", "rate", "phonenumber"])
        );
      } catch (error) {
        console.log(error);
        throw error;
      }
    } catch (error) {
      return res.status(500).send("Cannot access shelter.");
    }
  };

  // Update supported_type and
  // only called from other function in backend only
  updateSupportedType = async (shelterID) => {
    try {
      const nontTypes = await this.Room.find({
        shelter_id: shelterID,
        exist: true,
      }).distinct("nont_type");
      const newQuery = {
        _id: shelterID,
      };
      const newBody = {
        supported_type: nontTypes,
      };
      const updateRes = await this.Shelter.updateOne(newQuery, newBody);
      return updateRes;
    } catch (error) {
      throw error;
    }
  };

  // Update shelter's rate
  // only called from other function in backend only
  updateRate = async (shelterID) => {
    try {
      // find new average rate
      const reviewList = await this.Review.find({ shelter_id: shelterID }).select({
        rate: 1,
        _id: 0,
      });
      const reduceRate = await reviewList.reduce(
        (previousValue, currentValue) => {
          return {
            rate: previousValue.rate + currentValue.rate,
          };
        }
      );
      // update shelter
      const newQuery = {
        _id: shelterID,
      };
      const newBody = {
        rate: reduceRate.rate / reviewList.length,
      };
      const updateRes = await this.Shelter.updateOne(newQuery, newBody);
      return updateRes;
    } catch (error) {
      throw error;
    }
  };

  /*
PATCH /shelter/delete/:id
*/
  deleteShelter = async (req, res) => {
    try {
      const roomRes = await this.Room.find({
        shelter_id: req.params.id,
        exist: true,
      });
      var x = 0;
      if (roomRes.length !== 0) {
        roomRes.map(async (room) => {
          try {
            var reserveRes = await this.Reservation.findOne({
              room_id: room._id,
              status: { $in: ["payment-pending", "paid", "checked-in"] },
            });
            x = x + 1;
            if (reserveRes) {
              x = -1;
              return res
                .status(400)
                .send(
                  "Cannot delete shelter. Related reservation is still not completed."
                );
            }
          } catch (error) {
            console.log(error);
          }
          if (x === roomRes.length) {
            roomRes.map(async (room) => {
              var newRoom = {
                exist: false,
              };
              await this.Room.findByIdAndUpdate(
                room._id,
                { $set: newRoom },
                { new: true }
              );
            });
            var newBody = {
              exist: false,
              supported_type: [],
            };
            var updateShelterRes = await this.Shelter.findByIdAndUpdate(
              req.params.id,
              { $set: newBody },
              { new: true }
            );
            return res.send(updateShelterRes);
          }
        });
      } else {
        var newRoom = {
          exist: false,
        };
        var updateShelterRes = await this.Shelter.findByIdAndUpdate(
          req.params.id,
          { $set: newRoom },
          { new: true }
        );
        return res.send(updateShelterRes);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send("Cannot delete shelter");
    }
  };

  // Check exist name
  checkValidName = async (req, res) => {
    try {
      const nameFindResult = await this.Shelter.findOne({ name: req.body.name });
      if (nameFindResult) return res.send({ exist: true });
      else return res.send({ exist: false });
    } catch (error) {
      return res.status(500).send("Cannot access database.");
    }
  };

  /*
DELETE /shelter/remove/:id
*/
  remove = async (req, res) => {
    try {
      // remove shelter
      const newQuery = { _id: this.mongoose.Types.ObjectId(req.params.id) };
      const deleted = await this.Shelter.deleteOne(newQuery);
      return res.send(deleted);
    } catch (error) {
      return res.status(500).send("Cannot remove shelter");
    }
  };

  //PUT
  adminUpdateShelter = async (req, res) => {
    try {
      const newQuery = { _id: req.params.id };
      const newBody = req.body;
      const updatedShelter = await this.Shelter.updateOne(newQuery, newBody);
      return res.send(newBody);
    } catch (error) {
      return res.status(500).send("Internal Server Error, Please try again");
    }
  };
}

module.exports = new ShelterController();
