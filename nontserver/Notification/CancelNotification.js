NotificationInterface = require("./NotificationInterface")
class CancelNotification extends NotificationInterface{
    constructor(){
        super()
    } 
    notify = async (info) => {
        const NotificationContent = "<b>testCancellationCase</b>"
        const mailOptions = {
            from: this.SenderEmail,
            to: info.ReciverEmail,
            subject: info.Subject, 
            html: NotificationContent
        }
        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
           });
    }  
}

module.exports = new CancelNotification();