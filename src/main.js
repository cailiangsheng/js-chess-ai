function main() {
  window.board = new Board(container, "images/", "sounds/");
  board.setSearch(16);
  board.millis = 10;
  board.computer = 1;
  playEVE(board);
}

function playEVE(board) {
  var response = board.response;
  board.response = function (reason) {
    reason && response.apply(board);
  }
  board.onAddMove = function () {
    board.computer = 1 - board.computer;
    board.response('eve');
    board.flushBoard();
  }
  board.computer = 0;
  board.response('init');
  board.flushBoard();
}

main()