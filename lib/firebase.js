let firebase = require('firebase');

class Firebase {
    constructor (id) {
        this.id = id;
        this.rootUrl = 'https://fiery-inferno-7517.firebaseio.com/';
        this.userFirebase = new firebase(this.rootUrl+'users/'+id+'/');
        registerUser(this.userFirebase);
        this.rootEventsFirebase = new firebase(this.rootUrl+'events/');
    }

    send(e, data) {
        let dataToSend = {};
        dataToSend[e] = data;
        this.userFirebase.update(dataToSend);
        this.rootEventsFirebase.update(dataToSend);
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

    unregister() {
        this.userFirebase.update({'registered': false});
    }
}

function triggerCallback(callback, snapshot) {
    let val = snapshot.val();
    if (val !== null && val !== undefined) {
        callback(snapshot.val());
    }
}

function registerUser(userFirebase) {
    console.log('Registering user');
    userFirebase.update({'registered': true});
}


module.exports =  Firebase;
