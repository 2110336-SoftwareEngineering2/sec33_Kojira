const Reservation = require("../Models/Reservation");
const RandomCodes = require("random-codes");
const rc = new RandomCodes();

const controller = {
  payment: async (req, res) => {
    try {
      var validated_code = rc.validate(req.query.code);
      if (validated_code !== req.query.code || req.query.code === "") {
        res.status(401);
        res.send("code not match");
      } else {
        //console.log("QR scanned");
        Reservation.updateOne({ _id: req.query.reserveId }, { status: "paid" })
          .then(() => {
            res.send("payment finished");
          })
          .catch((err) => {
            res.statusCode = 500;
            res.send("can't make payment because reserve id is not found");
          });
      }
    } catch (err) {
      res.statusCode = 500;
      console.log(err);
      res.send("unexpected error");
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
