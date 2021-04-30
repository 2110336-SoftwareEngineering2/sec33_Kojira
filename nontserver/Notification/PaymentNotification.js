NotificationInterface = require("./NotificationInterface")
class PaymentlNotification extends NotificationInterface{
    constructor(){
        super()
    } 
    notify = async (info) => {
        const NotificationContent = "<b>testPaymentCase</b>"
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