const Reservation = require("../Models/Reservation");
const NontSitter = require("../Models/NontSitter");
const NotificationController = require("../Notification/NotificationController");
const PaymentNotification = require("../Notification/PaymentNotification");
const RandomCodes = require("random-codes");
const Rooms = require("../Models/Room");
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

        const ToBeUpdatedReservation = await Reservation.findById(
          req.query.reserveId
        );
        //console.log(ToBeUpdatedReservation)
        const nontSitter = await NontSitter.findById(
          ToBeUpdatedReservation.nontsitter_id
        );
        const room = await Rooms.findById(ToBeUpdatedReservation.room_id);
        const info = {
          ReciverEmail: nontSitter.email,
          Subject: "Reservation's payment completed",
          roomName: room.name,
          nontSitterName: ToBeUpdatedReservation.name,
          start_datetime: ToBeUpdatedReservation.start_datetime,
          end_datetime: ToBeUpdatedReservation.end_datetime,
          price: ToBeUpdatedReservation.price,
        };

        NotificationController.setNotificationBehavior(PaymentNotification);
        NotificationController.notify(info);

        Reservation.updateOne({ _id: req.query.reserveId }, { status: "paid" })
          .then(async () => {
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
