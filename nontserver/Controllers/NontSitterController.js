"use strict";
const InterfaceController = require("./InterfaceController");

class NontSitterController extends InterfaceController {
  constructor() {
    super();
    this.LoginController = require("./LoginController");
    this.PASSWORD_HASHING_ROUNDS = 10;
    this.schema = {
      email: this.joi.string().required().email(),
      password: this.joi.string().required().min(8).max(32),
      name: this.joi.string().required().min(1).max(64),
      phoneNumber: this.joi
        .string()
        .length(10)
        .pattern(/^[0-9]+$/),
      bankAccount: this.joi
        .string()
        .length(10)
        .pattern(/^[0-9]+$/),
    };
    this.validator = this.joi.object(this.joischema);
    this.updateSchema = {
      email: this.joi.string().email(),
      password: this.joi.string().min(8).max(32),
      name: this.joi.string().min(1).max(64),
      phoneNumber: this.joi
        .string()
        .length(10)
        .pattern(/^[0-9]+$/),
      bankAccount: this.joi
        .string()
        .length(10)
        .pattern(/^[0-9]+$/),
    };
    this.updateValidator = this.joi.object(this.updateSchema);
  }

  // GET /nontSitters
  getNontSitters = async (req, res) => {
    try {
      const nontSitterAccounts = await this.NontSitter.find();
      return res.send(nontSitterAccounts);
    } catch (error) {
      return res.status(500).send("Cannot access nont-sitter accounts.");
    }
  };

  // GET /nontSitters/:id
  getProfile = async (req, res) => {
    try {
      const nontSitterAccount = await this.NontSitter.findById(req.params.id);
      if (!nontSitterAccount) return res.status(404).send("User not found");
      return res.send(this._.omit(nontSitterAccount, ["password"]));
    } catch (error) {
      return res.status(500).send("Cannot access nont-sitter accounts.");
    }
  };

  // PATCH /nontSitters
  updateAccount = async (req, res) => {
    try {
      const data = req.body;
      if (!data._id) return res.status(400).send("ID not found");
      const validationResult = this.updateValidator.validate(
        this._.omit(data, ["_id"])
      );
      if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
      }
      if (data.email) {
        const emailFindResult = await this.NontSitter.findOne({
          email: data.email,
        });
        if (emailFindResult)
          return res.status(403).send("Email already exists.");
      }
      if (data.name) {
        const nameFindResult = await this.NontSitter.findOne({
          name: data.name,
        });
        if (nameFindResult)
          return res.status(403).send("Username already exists.");
      }
      if (data.password) {
        const hashedPassword = await this.bcrypt.hash(
          req.body.password,
          this.PASSWORD_HASHING_ROUNDS
        );
        data.password = hashedPassword;
      }
      const result = await this.NontSitter.findByIdAndUpdate(data._id, {
        $set: this._.omit(data, ["_id"]),
      });
      if (!result) return res.status(404).send("User not found");
      res.send("The account was successfully updated.");
    } catch (error) {
      return res.status(500).send("Cannot access nont-sitter accounts.");
    }
  };

  // POST /nontSitters
  create = async (req, res) => {
    const validationResult = this.validator.validate(req.body);
    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    }

    try {
      const emailFindResult = await this.NontSitter.findOne({
        email: req.body.email,
      });
      if (emailFindResult) return res.status(403).send("Email already exists.");
      const nameFindResult = await this.NontSitter.findOne({
        name: req.body.name,
      });
      if (nameFindResult)
        return res.status(403).send("Username already exists.");
    } catch (error) {
      return res
        .status(500)
        .send("Cannot access nont-sitter-account database.");
    }

    try {
      const hashedPassword = await this.bcrypt.hash(
        req.body.password,
        this.PASSWORD_HASHING_ROUNDS
      );
      const newBody = { ...req.body, password: hashedPassword };
      try {
        await this.NontSitter.create(newBody);
        return res.send("The account was successfully created.");
      } catch (error) {
        throw error;
      }
    } catch (error) {
      return res.status(500).send("Cannot create nont-sitter account.");
    }
  };

  // POST /nontSitter/check-email
  checkValidEmail = async (req, res) => {
    const emailSchema = this._.pick(this.schema, ["email"]);
    const emailValidator = this.joi.object(emailSchema);
    const result = emailValidator.validate(req.body);
    if (result.error) return res.send({ status: false, exist: false });
    try {
      const emailFindResult = await this.NontSitter.findOne({
        email: req.body.email,
      });
      if (emailFindResult) return res.send({ status: false, exist: true });
      else return res.send({ status: true });
    } catch (error) {
      return res
        .status(500)
        .send("Cannot access nont-sitter-account database.");
    }
  };

  // POST /nontSitter/check-name
  checkValidName = async (req, res) => {
    const nameSchema = this._.pick(this.schema, ["name"]);
    const nameValidator = this.joi.object(nameSchema);
    const result = nameValidator.validate(req.body);
    if (result.error) return res.send({ status: false, exist: false });
    try {
      const nameFindResult = await this.NontSitter.findOne({
        name: req.body.name,
      });
      if (nameFindResult) return res.send({ status: false, exist: true });
      else return res.send({ status: true });
    } catch (error) {
      return res
        .status(500)
        .send("Cannot access nont-sitter-account database.");
    }
  };

  // POST /nontSitters/login
  login = async (req, res) =>
    this.LoginController.login(req, res, this.NontSitter);

  //PUT /nontSitters/admin_update/:id
  adminUpdateNontSitter = async (req, res) => {
    try {
      const newQuery = { _id: req.params.id };
      const newBody = req.body;
      const updatedNontSitter = await this.NontSitter.updateOne(
        newQuery,
        newBody
      );
      return res.send(newBody);
    } catch (error) {
      return res.status(500).send("Internal Server Error, Please try again");
    }
  };

  /* 
DELETE /nontSitters/remove/:id
*/
  remove = async (req, res) => {
    try {
      // remove nontSitter
      const newQuery = { _id: this.mongoose.Types.ObjectId(req.params.id) };
      const deleted = await this.NontSitter.deleteOne(newQuery);
      return res.send(deleted);
    } catch (error) {
      return res.status(500).send("Cannot remove NontSitter");
    }
  };
}

module.exports = new NontSitterController();
