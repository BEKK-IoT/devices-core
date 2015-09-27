'use strict';

var five = require('johnny-five');

//should by default not start the repl
var _board = five.Board;
five.Board = function () {
  var opt = arguments.length <= 0 || arguments[0] === undefined ? { repl: false } : arguments[0];
  return _board(opt);
};

module.exports = five;