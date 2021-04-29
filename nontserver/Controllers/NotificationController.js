// "use strict"; due to let NotificationContent = ""

const nodemailer = require('nodemailer');
const NotificationInterface = require("./NotificationInterface")
const SenderEmail = "nontification.nontcompany@gmail.com"
const SenderPassword = "nont123zaz"
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
	user: SenderEmail,
	pass: SenderPassword        
	}
});
const BehaviorType = {
	Reservation : "Reservation",
	Payment : "Payment",
	Cancellation : "Cancellation"
}

class NotificationController extends NotificationInterface {
	constructor() {
	super()
	}
	setNotificationBehavior(info){
		let NotificationContent = ""

		const mailOptions = {
            from: SenderEmail,
            to: info.ReciverEmail,
            subject: info.Subject, 
            html: NotificationContent 
        };
	return  mailOptions
	}
	
	notify(info) {
		const mailOptions = setNotificationBehavior(info)
		transporter.sendMail(mailOptions, function (err, info) {
		  if(err)
			console.log(err)
		  else
			console.log(info);
		 });
		
	};
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