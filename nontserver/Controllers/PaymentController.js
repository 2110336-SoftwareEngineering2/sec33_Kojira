const Reservation = require("../Models/Reservation");
const RandomCodes = require("random-codes");
const rc = new RandomCodes();

const controller = {
  payment: async (req, res) => {
    var validated_code = rc.validate(req.query.code);
    if (validated_code !== req.query.code || req.query.code === "") {
      res.status(401);
      res.send("code not match");
    } else {
      //console.log("QR scanned");
      try {
        await Reservation.updateOne(
          { _id: req.query.reserveId },
          { status: "paid" }
        );
        res.send("payment finished");
      } catch (error) {
        res.status(500);
        res.send("unexpected error");
      }
    }
  },
  getCode: (req, res) => {
    try {
      const code = rc.generate();
      res.json({ code: code });
    } catch (err) {
      res.statusCode = 500;
      console.log(err);
      res.send(err);
    }
  },
};

module.exports = controller;
