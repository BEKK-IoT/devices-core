'use strict';

var johnnyFive = require('johnny-five');

var tmp = johnnyFive.Board;

johnnyFive.Board = function (firebase, boardVars) {
    var b = new tmp(boardVars);
    b.on('message', function (event) {
        if (event.message == 'Closing.') {
            firebase.unregister();
        }
    });
    return b;
};

module.exports = johnnyFive;