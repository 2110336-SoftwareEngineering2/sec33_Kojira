"use strict";
const InterfaceController = require("./InterfaceController");

class NontOwnerController extends InterfaceController {
  constructor() {
    super();
    this.LoginController = require("./LoginController");
    this.PASSWORD_HASHING_ROUNDS = 10;
    this.schema = {
      email: this.joi.string().required().email(),
      password: this.joi.string().required().min(8).max(32),
      name: this.joi.string().required().min(1).max(64),
      phoneNumber: this.joi.string()
        .length(10)
        .pattern(/^[0-9]+$/),
      bankAccount: this.joi.string()
        .length(10)
        .pattern(/^[0-9]+$/),
    };
    this.validator = this.joi.object(this.schema);
  }

  // GET /nontOwners
  getNontOwners = async (req, res) => {
    try {
      const nontOwnerAccounts = await this.NontOwner.find();
      return res.send(nontOwnerAccounts);
    } catch (error) {
      return res.status(500).send("Cannot access nont-owner accounts.");
    }
  }

  // GET /nontOwners/:id
  getProfile = async (req, res) => {
    try {
      const nontOwnerAccount = await this.NontOwner.findById(req.params.id);
      if (!nontOwnerAccount) return res.status(404).send("User not found");
      return res.send(nontOwnerAccount);
    } catch (error) {
      return res.status(500).send("Cannot access nont-owner accounts.");
    }
  }

  // POST /nontOwners
  create = async (req, res) => {
    const validationResult = this.validator.validate(req.body);
    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    }

    try {
      const emailFindResult = await this.NontOwner.findOne({
        email: req.body.email,
      });
      if (emailFindResult) return res.status(403).send("Email already exists.");
      const nameFindResult = await this.NontOwner.findOne({ name: req.body.name });
      if (nameFindResult)
        return res.status(403).send("Username already exists.");
    } catch (error) {
      return res.status(500).send("Cannot access nont-owner-account database.");
    }

    try {
      const hashedPassword = await this.bcrypt.hash(
        req.body.password,
        this.PASSWORD_HASHING_ROUNDS
      );
      const newBody = { ...req.body, password: hashedPassword };
      try {
        const nontOwnerAccount = await this.NontOwner.create(newBody);
        return res.send(this._.pick(nontOwnerAccount, ["_id", "email", "name"]));
      } catch (error) {
        throw error;
      }
    } catch (error) {
      return res.status(500).send("Cannot create nont-owner account.");
    }
  }

  // PATCH /nontOwners
  updateAccount = async (req, res) => {
    try {
      const data = req.body;
      if (data.email) {
        const emailFindResult = await this.NontOwner.findOne({ email: data.email });
        if (emailFindResult)
          return res.status(403).send("Email already exists.");
      }
      if (data.name) {
        const nameFindResult = await this.NontOwner.findOne({ name: data.name });
        if (nameFindResult)
          return res.status(403).send("Username already exists.");
      }
      await this.NontOwner.findByIdAndUpdate(
        data._id,
        { $set: this._.omit(data, ["_id"]) },
        { new: true }
      );
      res.send("The account was successfully updated.");
    } catch (error) {
      return res.status(500).send("Cannot access nont-owner accounts.");
    }
  }

  // POST /nontOwners/check-email
  checkValidEmail = async (req, res) => {
    const emailSchema = this._.pick(this.schema, ["email"]);
    const emailValidator = this.joi.object(emailSchema);
    const result = emailValidator.validate(req.body);
    if (result.error) return res.send({ status: false, exist: false });
    try {
      const emailFindResult = await this.NontOwner.findOne({
        email: req.body.email,
      });
      if (emailFindResult) return res.send({ status: false, exist: true });
      else return res.send({ status: true });
    } catch (error) {
      return res.status(500).send("Cannot access nont-owner-account database.");
    }
  }

  // POST /nontOwners/check-name
  checkValidName = async (req, res) => {
    const nameSchema = this._.pick(this.schema, ["name"]);
    const nameValidator = this.joi.object(nameSchema);
    const result = nameValidator.validate(req.body);
    if (result.error) return res.send({ status: false, exist: false });
    try {
      const nameFindResult = await this.NontOwner.findOne({ name: req.body.name });
      if (nameFindResult) return res.send({ status: false, exist: true });
      else return res.send({ status: true });
    } catch (error) {
      return res.status(500).send("Cannot access nont-owner-account database.");
    }
  }

  // POST /nontOwners/login
  login = async (req, res) => this.LoginController.login(req, res, this.NontOwner)

  //PUT /nontOwners/admin_update/:id
  adminUpdateNontOwner = async (req, res) => {
    try {
      const newQuery = {_id: req.params.id};
      const newBody = req.body;
      const updatedNontOwner = await this.NontOwner.updateOne(newQuery, newBody);
      return res.send(newBody);
    }
    catch(error) {
      return res.status(500).send("Internal Server Error, Please try again");
    }
  }

  /* 
  DELETE /nontOwners/remove/:id
    field required: nontowner_id
    return: delete status
  */
  remove = async (req, res) => {
    try {      
      // remove nontOwner
      const newQuery = { _id: mongoose.Types.ObjectId(req.params.id)};
      const deleted = await this.NontOwner.deleteOne(newQuery);
      return res.send(deleted);
    }
    catch (error) {
      return res.status(500).send("Cannot remove NontOwner");
    }
  }
}

module.exports = new NontOwnerController();

// const NontOwner = require("../Models/NontOwner");
// const _ = require("lodash");
// const Joi = require("joi");
// const bcrypt = require("bcryptjs");
// const LoginController = require("./LoginController");

// const PASSWORD_HASHING_ROUNDS = 10;

// const schema = {
//   email: Joi.string().required().email(),
//   password: Joi.string().required().min(8).max(32),
//   name: Joi.string().required().min(1).max(64),
//   phoneNumber: Joi.string()
//     .length(10)
//     .pattern(/^[0-9]+$/),
//   bankAccount: Joi.string()
//     .length(10)
//     .pattern(/^[0-9]+$/),
// };
// const validator = Joi.object(schema);

// const controller = {
//   // GET /nontOwners
//   getNontOwners: async (req, res) => {
//     try {
//       const nontOwnerAccounts = await NontOwner.find();
//       return res.send(nontOwnerAccounts);
//     } catch (error) {
//       return res.status(500).send("Cannot access nont-owner accounts.");
//     }
//   },

//   // GET /nontOwners/:id
//   getProfile: async (req, res) => {
//     try {
//       const nontOwnerAccount = await NontOwner.findById(req.params.id);
//       if (!nontOwnerAccount) return res.status(404).send("User not found");
//       return res.send(nontOwnerAccount);
//     } catch (error) {
//       return res.status(500).send("Cannot access nont-owner accounts.");
//     }
//   },

//   // POST /nontOwners
//   registerNontOwner: async (req, res) => {
//     const validationResult = validator.validate(req.body);
//     if (validationResult.error) {
//       return res.status(400).send(validationResult.error.details[0].message);
//     }

//     try {
//       const emailFindResult = await NontOwner.findOne({
//         email: req.body.email,
//       });
//       if (emailFindResult) return res.status(403).send("Email already exists.");
//       const nameFindResult = await NontOwner.findOne({ name: req.body.name });
//       if (nameFindResult)
//         return res.status(403).send("Username already exists.");
//     } catch (error) {
//       return res.status(500).send("Cannot access nont-owner-account database.");
//     }

//     try {
//       const hashedPassword = await bcrypt.hash(
//         req.body.password,
//         PASSWORD_HASHING_ROUNDS
//       );
//       const newBody = { ...req.body, password: hashedPassword };
//       try {
//         const nontOwnerAccount = await NontOwner.create(newBody);
//         return res.send(_.pick(nontOwnerAccount, ["_id", "email", "name"]));
//       } catch (error) {
//         throw error;
//       }
//     } catch (error) {
//       return res.status(500).send("Cannot create nont-owner account.");
//     }
//   },

//   // PATCH /nontOwners
//   updateAccount: async (req, res) => {
//     try {
//       const data = req.body;
//       if (data.email) {
//         const emailFindResult = await NontOwner.findOne({ email: data.email });
//         if (emailFindResult)
//           return res.status(403).send("Email already exists.");
//       }
//       if (data.name) {
//         const nameFindResult = await NontOwner.findOne({ name: data.name });
//         if (nameFindResult)
//           return res.status(403).send("Username already exists.");
//       }
//       await NontOwner.findByIdAndUpdate(
//         data._id,
//         { $set: _.omit(data, ["_id"]) },
//         { new: true }
//       );
//       res.send("The account was successfully updated.");
//     } catch (error) {
//       return res.status(500).send("Cannot access nont-owner accounts.");
//     }
//   },

//   // POST /nontOwners/check-email
//   checkValidEmail: async (req, res) => {
//     const emailSchema = _.pick(schema, ["email"]);
//     const emailValidator = Joi.object(emailSchema);
//     const result = emailValidator.validate(req.body);
//     if (result.error) return res.send({ status: false, exist: false });
//     try {
//       const emailFindResult = await NontOwner.findOne({
//         email: req.body.email,
//       });
//       if (emailFindResult) return res.send({ status: false, exist: true });
//       else return res.send({ status: true });
//     } catch (error) {
//       return res.status(500).send("Cannot access nont-owner-account database.");
//     }
//   },

//   // POST /nontOwners/check-name
//   checkValidName: async (req, res) => {
//     const nameSchema = _.pick(schema, ["name"]);
//     const nameValidator = Joi.object(nameSchema);
//     const result = nameValidator.validate(req.body);
//     if (result.error) return res.send({ status: false, exist: false });
//     try {
//       const nameFindResult = await NontOwner.findOne({ name: req.body.name });
//       if (nameFindResult) return res.send({ status: false, exist: true });
//       else return res.send({ status: true });
//     } catch (error) {
//       return res.status(500).send("Cannot access nont-owner-account database.");
//     }
//   },

//   // POST /nontOwners/login
//   login: async (req, res) => LoginController.login(req, res, NontOwner),

//   //PUT /nontOwners/admin_update/:id
//   adminUpdateNontOwner: async (req, res) => {
//     try {
//       const newQuery = {_id: req.params.id};
//       const newBody = req.body;
//       const updatedNontOwner = await NontOwner.updateOne(newQuery, newBody);
//       return res.send(newBody);
//     }
//     catch(error) {
//       return res.status(500).send("Internal Server Error, Please try again");
//     }
//   },

//   /* 
//   DELETE /nontOwners/remove/:id
//     field required: nontowner_id
//     return: delete status
//   */
//   removeNontOwner: async (req, res) => {
//     try {      
//       // remove nontOwner
//       const newQuery = { _id: mongoose.Types.ObjectId(req.params.id)};
//       const deleted = await NontOwner.deleteOne(newQuery);
//       return res.send(deleted);
//     }
//     catch (error) {
//       return res.status(500).send("Cannot remove NontOwner");
//     }
//   },

// };


