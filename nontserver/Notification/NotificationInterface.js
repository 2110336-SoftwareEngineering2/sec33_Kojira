// this class exists only for accuracy of design document.. serve as pseudocode interface.

class NotificationInterface{
    constructor() {
    this.nodemailer = require('nodemailer');
    this.SenderEmail = "nontification.nontcompany@gmail.com"
    this.SenderPassword = "nont123zaz"
    this.transporter = this.nodemailer.createTransport({
	    service: 'gmail',
	    auth: {
	    user: this.SenderEmail,
	    pass: this.SenderPassword        
	}
});
    }

    notify() {
    }
}
module.exports = NotificationInterface;