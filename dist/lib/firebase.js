'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var firebase = require('firebase');
var rootUrl = 'https://fiery-inferno-7517.firebaseio.com/';

var Firebase = (function () {
    function Firebase(id) {
        _classCallCheck(this, Firebase);

        this.id = id;
        this.userEvents = new firebase(rootUrl + 'users/' + id + '/');
        this.rootEvents = new firebase(rootUrl + 'events/');
    }

    _createClass(Firebase, [{
        key: 'send',
        value: function send(e, data) {
            var dataToSend = {};
            dataToSend[e] = data;
            this.userEvents.set(dataToSend);
            this.rootEvents.set(dataToSend);
        }
    }, {
        key: 'onEvent',
        value: function onEvent(e, callback) {
            var userEvent = new firebase(rootUrl + 'events/');
            userEvent.child(e).on('value', function (snapshot) {
                var val = snapshot.val();
                if (val !== null && val !== undefined) {
                    callback(snapshot.val());
                }
            });
        }
    }, {
        key: 'onUserEvent',
        value: function onUserEvent(id, e, callback) {
            var userEvent = new firebase(rootUrl + 'users/' + id + '/');
            userEvent.child(e).on('value', function (snapshot) {
                var val = snapshot.val();
                if (val !== null && val !== undefined) {
                    callback(snapshot.val());
                }
            });
        }
    }]);

    return Firebase;
})();

module.exports = Firebase;