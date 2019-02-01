
"use strict";

var resources = [
  "images/ba.gif",
  "images/bb.gif",
  "images/bc.gif",
  "images/bk.gif",
  "images/bkm.gif",
  "images/bn.gif",
  "images/bp.gif",
  "images/br.gif",
  "images/ra.gif",
  "images/rb.gif",
  "images/rc.gif",
  "images/rk.gif",
  "images/rkm.gif",
  "images/rn.gif",
  "images/rp.gif",
  "images/rr.gif",
  "images/oo.gif",
  "images/oos.gif",
  "images/board.jpg",
  "images/thinking.gif",
  "sounds/click.wav",
  "sounds/illegal.wav",
  "sounds/move.wav",
  "sounds/move2.wav",
  "sounds/capture.wav",
  "sounds/capture2.wav",
  "sounds/check.wav",
  "sounds/check2.wav",
  "sounds/win.wav",
  "sounds/draw.wav",
  "sounds/loss.wav",
  "sounds/newgame.wav",
  // "book.js",
  // "position.js",
  // "search.js",
  // "board.js",
  // "cchess.js",
  null
];
resources.pop();

var i;
var n = resources.length;
for (i = 0; i < resources.length; i++) {
  var xhr;
  if (typeof XMLHttpRequest == "undefined") {
    xhr = new ActiveXObject("MSXML2.XMLHttp");
  } else {
    xhr = new XMLHttpRequest();
  }
  xhr.onreadystatechange = function () {
    if (this.readyState < 4) {
      return;
    }
    n--;
    if (n > 0) {
      return;
    }
    // loadScript("book.js");
    // loadScript("position.js");
    // loadScript("search.js");
    // loadScript("board.js");
    // loadScript("cchess.js");
    container.innerHTML = "";
    setTimeout(main, 100);
  };
  if (typeof xhr.onerror != "undefined") {
    xhr.onerror = function () {
      container.innerHTML = "加载失败，请<a href=\"\">重试</a>";
    };
  }
  xhr.open("GET", resources[i], true);
  xhr.send(null);
}

var STARTUP_FEN = [
  "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w",
  "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKAB1R w",
  "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/R1BAKAB1R w",
  "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/9/1C5C1/9/RN2K2NR w",
];

function createOption(text, value, ie8) {
  var opt = document.createElement("option");
  opt.selected = true;
  opt.value = value;
  if (ie8) {
    opt.text = text;
  } else {
    opt.innerHTML = text.replace(/ /g, "&nbsp;");
  }
  return opt;
}

function loadScript(file) {
  var script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", file);
  document.body.appendChild(script);
}

var board;

function main() {
  board = new Board(container, "images/", "sounds/");
  board.setSearch(16);
  board.millis = 10;
  board.computer = 1;
  board.onAddMove = function () {
    var counter = (board.pos.mvList.length >> 1);
    var space = (counter > 99 ? "    " : "   ");
    counter = (counter > 9 ? "" : " ") + counter + ".";
    var text = (board.pos.sdPlayer == 0 ? space : counter) + move2Iccs(board.mvLast);
    var value = "" + board.mvLast;
    try {
      selMoveList.add(createOption(text, value, false));
    } catch (e) {
      selMoveList.add(createOption(text, value, true));
    }
    selMoveList.scrollTop = selMoveList.scrollHeight;
  };
}

function level_change() {
  board.millis = Math.pow(10, selLevel.selectedIndex + 1);
}

function restart_click() {
  selMoveList.options.length = 1;
  selMoveList.selectedIndex = 0;
  board.computer = 1 - selMoveMode.selectedIndex;
  board.restart(STARTUP_FEN[selHandicap.selectedIndex]);
}

function retract_click() {
  for (var i = board.pos.mvList.length; i < selMoveList.options.length; i++) {
    board.pos.makeMove(parseInt(selMoveList.options[i].value));
  }
  board.retract();
  selMoveList.options.length = board.pos.mvList.length;
  selMoveList.selectedIndex = selMoveList.options.length - 1;
}

function moveList_change() {
  if (board.result == RESULT_UNKNOWN) {
    selMoveList.selectedIndex = selMoveList.options.length - 1;
    return;
  }
  var from = board.pos.mvList.length;
  var to = selMoveList.selectedIndex;
  if (from == to + 1) {
    return;
  }
  if (from > to + 1) {
    for (var i = to + 1; i < from; i++) {
      board.pos.undoMakeMove();
    }
  } else {
    for (var i = from; i <= to; i++) {
      board.pos.makeMove(parseInt(selMoveList.options[i].value));
    }
  }
  board.flushBoard();
}