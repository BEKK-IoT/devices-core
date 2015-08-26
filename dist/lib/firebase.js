'use strict';

var Firebase = require('firebase');
var iot = new Firebase('https://fiery-inferno-7517.firebaseio.com/');

function send(e, data) {
	var dataToSend = {};
	dataToSend[e] = data;
	iot.set(dataToSend);
}

function on(e, callback) {
	iot.child(e).on('value', function (snapshot) {
		var val = snapshot.val();
		if (val !== null && val !== undefined) {
			callback(snapshot.val());
		}
	});
}

module.exports = {
	send: send,
	on: on
};