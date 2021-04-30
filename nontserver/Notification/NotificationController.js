// "use strict"; due to let NotificationContent = ""

var notificationBehavior = null;

class NotificationController {
  setNotificationBehavior(behavior) {
    notificationBehavior = behavior;
  }

  notify(info) {
    notificationBehavior.notify(info);
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
