"use strict";
const InterfaceController = require("./InterfaceController");

class NontController extends InterfaceController {
  constructor() {
    super();
    this.validate_certificate = this.joi.object({
      name: this.joi.string().required(),
      img: this.joi.binary().required(),
    });

    this.validate_picture = this.joi.object({
      img: this.joi.binary().required(),
    });

    //validator for create and updateNont
    this.validator = this.joi.object({
      name: this.joi.string().required().min(1).max(32),
      type: this.joi
        .string()
        .valid(...Object.values(this.nontTypes))
        .required(),
      subtype: this.joi.string().optional().allow("").max(50),
      description: this.joi.string().optional().allow("").max(500),
      // birth_date: joi.date().valid('YYYY-MM-DD').required(),
      birth_date: this.joi.date().required(),
      // birth_date: joi.string().regex(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/).required(),
      medical_certificate: this.joi.array().items(this.validate_certificate),
      picture: this.joi.array().items(this.validate_picture),
      nontowner_id: this.joiOid.objectId().required(),
    });
  }
  // GET
  getNonts = async (req, res) => {
    try {
      const nont = await this.Nont.find();
      return res.send(nont);
    } catch (error) {
      return res.status(500).send("Internal Server Error, Please try again");
    }
  };
  // GET NONT BY ID : maybe not need
  getNontByID = async (req, res) => {
    try {
      const nont = await this.Nont.findOne({ _id: req.params.id });
      //  if(nont === null) return res.send(`there is no nont with id: ${req.params.id}`);
      return res.send(nont);
    } catch (error) {
      return res.status(500).send("Internal Server Error, Please try again");
    }
  };
  //GET NONT BY NAME
  getNontByName = async (req, res) => {
    try {
      const nont = await this.Nont.find({ name: req.params.name, exist: true });
      //if(Object.keys(nont).length === 0) return res.send(`there is no nont with name: ${req.params.name}`);
      return res.send(nont);
    } catch (error) {
      return res.status(500).send("Internal Server Error, Please try again");
    }
  };
  getNontByType = async (req, res) => {
    try {
      const nont = await this.Nont.find({ type: req.params.type, exist: true });
      //  if(Object.keys(nont).length === 0) return res.send(`there is no nont with type: ${req.params.type}`);
      return res.send(nont);
    } catch (error) {
      return res.status(500).send("Internal Server Error, Please try again");
    }
  };
  getNontByNontOwnerID = async (req, res) => {
    try {
      const nont = await this.Nont.find({
        nontowner_id: req.params.id,
        exist: true,
      });
      // if(Object.keys(nont).length === 0) return res.send(`there is no nont with nontowner_id: ${req.params.id}`);
      return res.send(nont);
    } catch (error) {
      return res.status(500).send("Internal Server Error, Please try again");
    }
  };
  // POST create new nont
  create = async (req, res) => {
    // req.body validation using joi
    const validationResult = this.validator.validate(req.body);
    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    }
    // no unique attribute -> do not check
    // create new Nont and save to db
    try {
      const newBody = {
        name: req.body.name,
        type: req.body.type,
        subtype: req.body.subtype,
        description: req.body.description,
        birth_date: req.body.birth_date.split("T")[0],
        medical_certificate: req.body.medical_certificate,
        picture: req.body.picture,
        nontowner_id: mongoose.Types.ObjectId(req.body.nontowner_id),
        exist: true,
      };
      const newNont = await this.Nont.create(newBody);
      return res.send(newNont);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Internal Server Error, Please try again");
    }
  };

  // PUT update nont
  updateNont = async (req, res) => {
    const validationResult = this.validator.validate(req.body);
    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    }
    try {
      const newQuery = { _id: mongoose.Types.ObjectId(req.params.id) };
      const newBody = {
        name: req.body.name,
        type: req.body.type,
        subtype: req.body.subtype,
        description: req.body.description,
        birth_date: req.body.birth_date.split("T")[0],
        medical_certificate: req.body.medical_certificate,
        picture: req.body.picture,
        nontowner_id: mongoose.Types.ObjectId(req.body.nontowner_id),
        exist: true,
      };
      const updatedNont = await this.Nont.updateOne(newQuery, newBody);
      return res.send(updatedNont);
    } catch (error) {
      return res.status(500).send("Internal Server Error, Please try again");
    }
  };

  /*
    PATCH /nont/delete/:id
    */
  deleteNont = async (req, res) => {
    try {
      // check if there is incompleted reservation with this nont_id
      const reserveRes = await this.Reservation.findOne({
        nont_id: { $elemMatch: { $eq: req.params.id } },
        status: { $in: ["payment-pending", "paid", "checked-in"] },
      });
      if (reserveRes) {
        return res
          .status(400)
          .send(
            "Cannot delete nont. Related reservtion is still not completed."
          );
      }
      // delete nont by change exist to false
      const newQuery = { _id: mongoose.Types.ObjectId(req.params.id) };
      const newBody = { exist: false };
      const cancelledNont = await this.Nont.updateOne(newQuery, newBody);
      return res.send(cancelledNont);
    } catch (error) {
      return res.status(500).send("Internal Server Error, Please try again");
    }
  };

  //DELETE (old delete nont)
  remove = async (req, res) => {
    try {
      // check if there is incompleted reservation with this nont_id
      const reserveRes = await this.Reservation.findOne({
        nont_id: { $elemMatch: { $eq: req.params.id } },
        status: { $in: ["payment-pending", "paid", "checked-in"] },
      });
      if (reserveRes) {
        return res
          .status(400)
          .send(
            "Cannot remove nont. Related reservtion is still not completed."
          );
      }
      // remove nont
      const newQuery = { _id: mongoose.Types.ObjectId(req.params.id) };
      const deletedNont = await this.Nont.deleteOne(newQuery);
      return res.send(deletedNont);
    } catch (error) {
      return res.status(500).send("Internal Server Error, Please try again");
    }
  };

  //PUT
  adminUpdateNont = async (req, res) => {
    try {
      const newQuery = { _id: req.params.id };
      const newBody = req.body;
      const updatedNont = await this.Nont.updateOne(newQuery, newBody);
      return res.send(newBody);
    } catch (error) {
      return res.status(500).send("Internal Server Error, Please try again");
    }
  };
}

module.exports = new NontController();