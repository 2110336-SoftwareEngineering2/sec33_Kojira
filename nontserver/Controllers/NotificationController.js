// "use strict"; do i need this?

class NotificationController {
    constructor() {
        const nodemailer = require('nodemailer');
        const senderEmail = "nontification.nontcompany@gmail.com"
        const senderPassword = "nont123zaz"
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: senderEmail,
              pass: senderPassword        
            }
          });
    }

    ReservationNotify(info){
        const NotificationContent = "<b>Do you receive this mail?</b>"

        const mailOptions = {
            from: senderEmail,
            to: info.Email,
            subject: info.subject, 
            html: NotificationContent 
          };
        return mailOptions
    }
    PaymentNotify(info){
        const NotificationContent = "<b>Do you receive this mail?</b>"

        const mailOptions = {
            from: senderEmail,
            to: info.Email,
            subject: info.subject,            
            html: NotificationContent 
          };
        return mailOptions
    }
    CancellationNotify(info){
        const NotificationContent = "<b>Do you receive this mail?</b>"

        const mailOptions = {
            from: senderEmail,
            to: info.Email,
            subject: info.subject,            
            html: NotificationContent
          };
        return mailOptions
    }

    SendNotification(mailOptions){
        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
         });
    }
}

module.exports = new NotificationController();

/*
const info = {
    receiver:
    subject:
    ReservationID:
    nontsitterName:
    nontsitterEmail:
    nontowner:
    roomname:
    ...
    ...
}
*/