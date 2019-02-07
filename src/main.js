function main() {
  window.board = new Board(container, "images/", "sounds/");
  board.setSearch(16);
  board.millis = 10;
  board.computer = 1;
  playEVE(board);
}

function playEVE(board) {
  board.onAddMove = function () {
    board.computer = 1 - board.computer;
    board.response();
    board.flushBoard();
  }
  board.computer = 0;
  board.response();
  board.flushBoard();
}

main()