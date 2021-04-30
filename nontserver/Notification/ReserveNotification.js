NotificationInterface = require("./NotificationInterface")
class ReservelNotification extends NotificationInterface{
    constructor(){
        super()
    } 
    notify = async (info) => {
        const NotificationContent = "<b>testReserveCase</b>"
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

module.exports = new ReservelNotification();