"use strict";
const InterfaceController = require("./InterfaceController");

class ReviewController extends InterfaceController {
  constructor() {
    super();
    this.ShelterController = require("./ShelterController.js");
    this.validator = this.joi.object({
      nontowner_id: this.joiOid.objectId().required(),
      shelter_id: this.joiOid.objectId().required(),
      reservation_id: this.joiOid.objectId().required(),
      rate: this.joi.number().min(0).max(5).required(),
      comment: this.joi.string().max(500),
    });
    this.updateValidator = this.joi.object({
      _id: this.joiOid.objectId().required(),
      rate: this.joi.number().min(0).max(5).required(),
      comment: this.joi.string().max(500),
    });
  }

  // GET all
  getReviews = async (req, res) => {
    try {
      const allReviews = await this.Review.find();
      return res.send(allReviews);
    } catch (error) {
      return res.status(500).send("Cannot access reviews");
    }
  };
  getReviewByID = async (req, res) => {
    try {
      const review = await this.Review.findOne({ _id: req.params.id });
      return res.send(review);
    } catch (error) {
      return res.status(500).send("Cannot access review by id");
    }
  };

  /* 
POST /review
    create new review
    field required: nontowner_id, shelter_id, reservation_id, rate, comment
    (comment can be empty string but should have field)
    return review created 
*/
  create = async (req, res) => {
    const validationResult = this.validator.validate(req.body);
    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    }
    try {
      const newBody = {
        ...req.body,
      };
      // check if nontowner_id and shelter_id are consistant with reservation_id
      // for unique reservation_id is checking in database indices.
      const reserveResult = await this.Reservation.findById(newBody.reservation_id);
      if (
        !reserveResult.nontowner_id.equals(newBody.nontowner_id) ||
        !reserveResult.shelter_id.equals(newBody.shelter_id)
      ) {
        return res
          .status(400)
          .send(
            "Cannot create review. reservation_id is not consistant with nontowner_id and shelter_id."
          );
      }
      // create new review
      const newReview = await this.Review.create(newBody);
      // update average rate
      const updateRateRes = this.ShelterController.updateRate(newReview.shelter_id);
      return res.send(newReview);
    } catch (error) {
      return res.status(500).send("Cannot create review");
    }
  };

  // GET review by shelterID
  getReviewByShelterID = async (req, res) => {
    try {
      const review = await this.Review.find({ shelter_id: req.params.id })
        .populate("nontowner_id")
        .populate("reservation_id");
      return res.send(review);
    } catch (error) {
      return res.status(500).send("Cannot get review by ShelterID");
    }
  };

  // GET review by reservationID
  getReviewByReservationID = async (req, res) => {
    try {
      const review = await this.Review.find({ reservation_id: req.params.id })
        .populate("nontowner_id")
        .populate("reservation_id")
        .populate("shelter_id");
      return res.send(review);
    } catch (error) {
      return res.status(500).send("Cannot get review by ReservationID");
    }
  };

  // GET review by nontOwnerID
  getReviewByNontOwnerID = async (req, res) => {
    try {
      const review = await this.Review.find({ nontowner_id: req.params.id })
        .populate("nontowner_id")
        .populate("reservation_id")
        .populate("shelter_id");
      return res.send(review);
    } catch (error) {
      return res.status(500).send("Cannot get review by NontOwnerID");
    }
  };

  /*
PATCH /review
    update review
    field required: _id, rate, comment
    (_id is review_id, other id object should not be changed)
    return review after updated
*/
  updateReview = async (req, res) => {
    const validationResult = this.updateValidator.validate(req.body);
    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    }
    try {
      const newBody = {
        ...req.body,
      };
      const updateRes = await this.Review.findByIdAndUpdate(
        newBody._id,
        { $set: newBody },
        { new: true }
      );
      // update average rate
      const updateRateRes = this.ShelterController.updateRate(updateRes.shelter_id);
      return res.send(updateRes);
    } catch (error) {
      return res.status(500).send("Cannot update review");
    }
  };

  /*
DELETE /review/remove/:id
    remove review
    field required: _id
    (_id is review_id)
    return: deleted result
*/
  remove = async (req, res) => {
    try {
      // search review
      const searchRes = await this.Review.findById(req.params.id);
      // delete review
      const deleteQuery = { _id: req.params.id };
      const deleteResult = await this.Review.deleteOne(deleteQuery);
      // update average rate
      const updateRateRes = this.ShelterController.updateRate(searchRes.shelter_id);
      return res.send(deleteResult);
    } catch (error) {
      return res.status(500).send("Cannot delete review");
    }
  };

  //PUT
  adminUpdateReview = async (req, res) => {
    try {
      const newQuery = { _id: req.params.id };
      const newBody = req.body;
      const updatedReview = await this.Review.updateOne(newQuery, newBody);
      return res.send(newBody);
    } catch (error) {
      return res.status(500).send("Internal Server Error, Please try again");
    }
  };
}

module.exports = new ReviewController();
