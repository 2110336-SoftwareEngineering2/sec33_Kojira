NotificationInterface = require("./NotificationInterface")
class PaymentlNotification extends NotificationInterface{
    constructor(){
        super()
    } 
    notify = async (info) => {
        const NotificationContent = "<b>to NontSitter " + info.nontSitterName + "<br>    Reservation's payment for your shelter at room : " + info.roomName + " has been completed<br>    Start date : " + info.start_datetime + "<br>    End date : " + info.end_datetime + "<br>	Total price : " + info.price + "</b>"
        const mailOptions = {
            from: this.SenderEmail,
            to: info.ReciverEmail,
            subject: info.Subject, 
            html: NotificationContent
        }
        this.transporter.sendMail(mailOptions, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
           });
    }  
}

module.exports = new PaymentlNotification();