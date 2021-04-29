// "use strict"; due to let NotificationContent = ""

const nodemailer = require('nodemailer');
//const NotificationInterface = require("./NotificationInterface")
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

var notificationBehavior = null; 

class NotificationController {
	setNotificationBehavior(behavior){
		notificationBehavior = behavior
	}
	
	notify(info) {
		notificationBehavior.notify(info)
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