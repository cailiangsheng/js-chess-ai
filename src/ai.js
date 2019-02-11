
"use strict";

var RESULT_UNKNOWN = 0;
var RESULT_WIN = 1;
var RESULT_DRAW = 2;
var RESULT_LOSS = 3;

function alertDelay(message) {
  console.log(message)
}

class ChessAI {
  constructor() {
    this.pos = new Position();
    this.pos.fromFen("rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1");
    this.search = null;
    this.sqSelected = 0;
    this.mvLast = 0;
    this.millis = 0;
    this.computer = -1;
    this.result = RESULT_UNKNOWN;
    this.busy = false;
  }

  setLevel(level) {
    level = isNaN(level) ? 0 : Math.max(Math.min(level, 0), 2);
    this.millis = Math.pow(10, level + 1);
  }

  playSound(soundFile) {
    console.log('AI.playSound', soundFile)
  }

  setSearch(hashLevel) {
    this.search = hashLevel == 0 ? null : new Search(this.pos, hashLevel);
  }

  flipped(sq) {
    return this.computer == 0 ? SQUARE_FLIP(sq) : sq;
  }

  computerMove() {
    return this.pos.sdPlayer == this.computer;
  }

  computerLastMove() {
    return 1 - this.pos.sdPlayer == this.computer;
  }

  addMove(mv, computerMove) {
    console.log('AI.addMove', mv, computerMove)
    if (!this.pos.legalMove(mv)) {
      return;
    }
    if (!this.pos.makeMove(mv)) {
      this.playSound("illegal");
      return;
    }
    this.busy = true;
    this.postAddMove(mv, computerMove);
  }

  postAddMove(mv, computerMove) {
    console.log('AI.postAddMove')
    this.sqSelected = 0;
    this.mvLast = mv;

    if (this.pos.isMate()) {
      this.playSound(computerMove ? "loss" : "win");
      this.result = computerMove ? RESULT_LOSS : RESULT_WIN;

      var pc = SIDE_TAG(this.pos.sdPlayer) + PIECE_KING;
      var sqMate = 0;
      for (var sq = 0; sq < 256; sq++) {
        if (this.pos.squares[sq] == pc) {
          sqMate = sq;
          break;
        }
      }
      if (!this.animated || sqMate == 0) {
        this.postMate(computerMove);
        return;
      }

      sqMate = this.flipped(sqMate);
      this.postMate(computerMove);
      return;
    }

    var vlRep = this.pos.repStatus(3);
    if (vlRep > 0) {
      vlRep = this.pos.repValue(vlRep);
      if (vlRep > -WIN_VALUE && vlRep < WIN_VALUE) {
        this.playSound("draw");
        this.result = RESULT_DRAW;
        alertDelay("双方不变作和，辛苦了！");
      } else if (computerMove == (vlRep < 0)) {
        this.playSound("loss");
        this.result = RESULT_LOSS;
        alertDelay("长打作负，请不要气馁！");
      } else {
        this.playSound("win");
        this.result = RESULT_WIN;
        alertDelay("长打作负，祝贺你取得胜利！");
      }
      this.postAddMove2();
      this.busy = false;
      return;
    }

    if (this.pos.captured()) {
      var hasMaterial = false;
      for (var sq = 0; sq < 256; sq++) {
        if (IN_BOARD(sq) && (this.pos.squares[sq] & 7) > 2) {
          hasMaterial = true;
          break;
        }
      }
      if (!hasMaterial) {
        this.playSound("draw");
        this.result = RESULT_DRAW;
        alertDelay("双方都没有进攻棋子了，辛苦了！");
        this.postAddMove2();
        this.busy = false;
        return;
      }
    } else if (this.pos.pcList.length > 100) {
      var captured = false;
      for (var i = 2; i <= 100; i++) {
        if (this.pos.pcList[this.pos.pcList.length - i] > 0) {
          captured = true;
          break;
        }
      }
      if (!captured) {
        this.playSound("draw");
        this.result = RESULT_DRAW;
        alertDelay("超过自然限着作和，辛苦了！");
        this.postAddMove2();
        this.busy = false;
        return;
      }
    }

    if (this.pos.inCheck()) {
      this.playSound(computerMove ? "check2" : "check");
    } else if (this.pos.captured()) {
      this.playSound(computerMove ? "capture2" : "capture");
    } else {
      this.playSound(computerMove ? "move2" : "move");
    }

    this.postAddMove2();
    this.response();
  }

  postAddMove2() {
    console.log('AI.postAddMove2')
    if (typeof this.onAddMove == "function") {
      this.onAddMove();
    }
  }

  postMate(computerMove) {
    console.log('AI.postMate', computerMove)
    alertDelay(computerMove ? "请再接再厉！" : "祝贺你取得胜利！");
    this.postAddMove2();
    this.busy = false;
  }

  response() {
    console.log('AI.response')
    if (this.search == null || !this.computerMove()) {
      this.busy = false;
      return;
    }
    var this_ = this;
    this.busy = true;
    setTimeout(function () {
      this_.addMove(this_.search.searchMain(LIMIT_DEPTH, this_.millis), true);
    }, 250);
  }

  clickSquare(sq_) {
    if (this.busy || this.result != RESULT_UNKNOWN) {
      return;
    }
    var sq = this.flipped(sq_);
    var pc = this.pos.squares[sq];
    if ((pc & SIDE_TAG(this.pos.sdPlayer)) != 0) {
      this.sqSelected = sq;
    } else if (this.sqSelected > 0) {
      this.addMove(MOVE(this.sqSelected, sq), false);
    }
  }

  restart(fen = 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w') {
    if (this.busy) {
      return;
    }
    this.result = RESULT_UNKNOWN;
    this.pos.fromFen(fen);
    this.mvLast = this.pos.mvList[this.pos.mvList.length - 1];
    this.playSound("newgame");
    this.response();
  }

  retract() {
    if (this.busy) {
      return;
    }
    this.result = RESULT_UNKNOWN;
    if (this.pos.mvList.length > 1) {
      this.pos.undoMakeMove();
    }
    if (this.pos.mvList.length > 1 && this.computerMove()) {
      this.pos.undoMakeMove();
    }
    this.mvLast = this.pos.mvList[this.pos.mvList.length - 1];
    this.response();
  }
}

module.exports = {
  RESULT: {
    UNKNOWN: RESULT_UNKNOWN,
    WIN: RESULT_WIN,
    LOSS: RESULT_LOSS,
    DRAW: RESULT_DRAW
  },
  ChessAI,
  move2Iccs,
  MOVE
}