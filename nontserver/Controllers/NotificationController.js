// "use strict"; due to let NotificationContent = ""

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

const BehaviorType = {
	Reservation : "Reservation",
	Payment : "Payment",
	Cancellation : "Cancellation"
}



class NotificationController extends NotificationInterface{
	constructor(info) {
	super()
	const mailOptions = this.setNotificationBehavior(info)
	}

	//switch case for each behavior.....

	setNotificationBehavior(info){
		let NotificationContent = ""
		switch (info.BehaviorType){
			case BehaviorType.Reservation :
				NotificationContent = "<b>testReservationCase</b>"
				break;
			case BehaviorType.Payment :
				NotificationContent = "<b>testPaymentCase</b>"
				break;
			case BehaviorType.Cancellation :
				NotificationContent = "<b>testCancellationCase</b>"
		}
		const mailOptions = {
            from: SenderEmail,
            to: info.ReciverEmail,
            subject: info.Subject, 
            html: NotificationContent 
        };
	return  mailOptions
	}
	
	notify() {
		transporter.sendMail(this.mailOptions, function (err, info) {
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