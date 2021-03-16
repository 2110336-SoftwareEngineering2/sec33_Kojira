const Reservation = require("../Models/Reservation");
const RandomCodes = require("random-codes");
const rc = new RandomCodes();

const controller = {
  payment: async (req, res) => {
    var validated_code = rc.validate(req.query.code);
    if (validated_code !== req.query.code) {
      res.send("code not match");
    } else {
      //console.log("QR scanned");
      const reservation = await Reservation.findById(req.params.id);
      console.log(reservation);
      await Reservation.updateOne(
        { _id: req.query.reserveId },
        { status: "paid" }
      );
      res.send("payment finished");
    }
  },
};

module.exports = controller;
