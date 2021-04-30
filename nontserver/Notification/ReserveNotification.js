NotificationInterface = require("./NotificationInterface");
class ReservelNotification extends NotificationInterface {
  constructor() {
    super();
  }
  notify = async (info) => {
    const NotificationContent =
      "<b>to NontSitter " +
      info.nontSitterName +
      "<br>    There is reservation for your shelter at room : " +
      info.roomName +
      "<br>    Start date : " +
      info.start_datetime +
      "<br>    End date : " +
      info.end_datetime +
      "<br>	Total price : " +
      info.price +
      "<br>you will notify later again after payment for your reservation is completed by nontOwner</b>";
    const mailOptions = {
      from: this.SenderEmail,
      to: info.ReciverEmail,
      subject: info.Subject,
      html: NotificationContent,
    };
    this.transporter.sendMail(mailOptions, function (err, info) {
      if (err) console.log(err);
      else console.log(info);
    });
  };
}

module.exports = new ReservelNotification();
