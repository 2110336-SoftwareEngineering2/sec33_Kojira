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
        
        //const ToBeUpdatedReservation = await this.Reservation.findById(req.query.reserveId );

        const UpdatedReservation = Reservation.findOneAndUpdate(
          { _id: req.query.reserveId },
          { status: "paid" },
          {new : true}
        ).then( async () => {

          //notification
          const NontSitter = await this.NontSitter.findById(UpdatedReservation.nontsitter_id)

          const info = {
          notiType : "Reservation",
          ReciverEmail : NontSitter.email,
          subject : "Reservation",
          Extra : "......." //will add more later to fill in content for each behavior
        }
        NotificationController.setNotificationBehavior(this.PaymentNotification)
        NotificationBehavior.notify(info)


          res.send("payment finished");
        }).catch((err => {
          res.statusCode = 500;
          res.send("can't make payment becaue reserve id not found");
        }));
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
