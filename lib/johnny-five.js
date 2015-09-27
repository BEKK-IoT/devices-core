let five = require('johnny-five');

//should by default not start the repl
const _board = five.Board;
five.Board = (opt = {repl: false}) => _board(opt);

module.exports = five;
