import {
  RESULT,
  ChessAI,
  move2Iccs
} from '../dist/ai'

import { getResult } from './util'

const getAI = () => {
  var ai = new ChessAI();
  ai.setSearch(16);
  ai.setLevel(2); // ai.millis = 10;
  ai.computer = 1;
  return ai;
}

const playEVE = (ai) => {
  var response = ai.response;
  ai.response = function (reason) {
    reason && response.apply(ai);
  }
  ai.onAddMove = function () {
    var numMoves = ai.pos.mvList.length - 1;
    var iccs = move2Iccs(ai.mvLast)
    console.log('EVE.onAddMove', `#${numMoves}`, `[${iccs}]`);
    if (ai.result === RESULT.UNKNOWN) {
      ai.computer = 1 - ai.computer;
      ai.response('eve');
    } else {
      console.log('EVE.result', getResult(ai));
      console.log('EVE.fen', ai.pos.toFen());
    }
  }
  ai.computer = 0;
  ai.response('init');
}

playEVE(getAI());
