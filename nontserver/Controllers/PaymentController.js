const Reservation = require("../Models/Reservation");
const RandomCodes = require("random-codes");
const rc = new RandomCodes();

const controller = {
  // payment/qr--query
  payment: async (req, res) => {
    var validated_code = rc.validate(req.query.code);
    if (validated_code !== req.query.code) {
      //query.code = "aaaa"
      res.status(401);
      res.send("code not match");
    } else {
      try {
        //success query.code = ""
        await Reservation.updateOne(
          { _id: req.query.reserveId },
          { status: "paid" }
        );
        res.send("payment finished");
      } catch (error) {
        //unknown reservation id
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
