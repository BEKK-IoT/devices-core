let five = require('johnny-five');

//should by default not start the repl
const _board = five.Board;
five.Board = (opt) => _board(Object.assign({repl: false}, opt));

module.exports = five;
