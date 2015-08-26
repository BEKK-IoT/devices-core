let Firebase = require('firebase');
let iot = new Firebase('https://fiery-inferno-7517.firebaseio.com/');

function send(e, data) {
    let dataToSend = {};
    dataToSend[e] = data;
    iot.set(dataToSend);
}

function on(e, callback) {
	iot.child(e).on('value', function(snapshot) {
		let val = snapshot.val();
		if (val !== null && val !== undefined) {
			callback(snapshot.val());
		}
	});	
}

module.exports = {
    send,
    on
}
