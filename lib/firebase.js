let firebase = require('firebase');
let rootUrl = 'https://fiery-inferno-7517.firebaseio.com/';

class Firebase {
    constructor (id) {
        this.id = id;
        this.userEvents = new firebase(rootUrl+'users/'+id+'/');
        this.rootEvents = new firebase(rootUrl+'events/');
    }

    send(e, data) {
        let dataToSend = {};
        dataToSend[e] = data;
        this.userEvents.set(dataToSend);
        this.rootEvents.set(dataToSend);
    }

    onEvent(e, callback) {
        let userEvent = new firebase(rootUrl+'events/');
        userEvent.child(e).on('value', function(snapshot) {
            triggerCallback(callback, snapshot);
        });
    }

    onUserEvent(id, e, callback) {
        let userEvent = new firebase(rootUrl+'users/'+id+'/');
        userEvent.child(e).on('value', function(snapshot) {
            triggerCallback(callback, snapshot);
        });
    }
}

var triggerCallback = function(callback, snapshot) {
    let val = snapshot.val();
    if (val !== null && val !== undefined) {
        callback(snapshot.val());
    }
}


module.exports =  Firebase;
