let five = require('johnny-five');

//should by default not start the repl
let _board = five.Board;
five.Board = (opt) => {
    console.log(_board);
    _board = _board(Object.assign({repl: false}, opt));
    if (opt.hasOwnProperty('io')) {
        _board.on('ready', () => new five.Sensor("A5"));
    }
    return _board;
}

module.exports = five;
