let johnnyFive = require('johnny-five');

let tmp = johnnyFive.Board;

johnnyFive.Board = function(firebase, boardVars) {
    let b = new tmp(boardVars);
    b.on('message', function(event) {
        if(event.message == 'Closing.') {
            firebase.unregister();
        }
    })
    return b;
}

module.exports = johnnyFive;
