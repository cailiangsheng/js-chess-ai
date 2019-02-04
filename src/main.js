function main() {
  window.board = new Board(container, "images/", "sounds/");
  board.setSearch(16);
  board.millis = 10;
  board.computer = 1;
}

main()