import {
  RESULT,
  ChessAI,
  move2Iccs
} from '../dist/ai'

const getAI = () => {
  var ai = new ChessAI();
  ai.setSearch(16);
  ai.millis = 10;
  ai.computer = 1;
  return ai;
}

const playEVE = (ai) => {
  ai.onAddMove = function () {
    var numMoves = ai.pos.mvList.length - 1;
    var iccs = move2Iccs(ai.mvLast)
    console.warn('EVE.onAddMove', `#${numMoves}`, `[${iccs}]`)
    if (ai.result === RESULT.UNKNOWN) {
      ai.computer = 1 - ai.computer;
      ai.response();
    } else {
      const result = {
        [RESULT.WIN]: 'win',
        [RESULT.LOSS]: 'loss',
        [RESULT.DRAW]: 'draw',
        [RESULT.UNKNOWN]: 'unknown'
      }[ai.result];
      console.log('EVE.result', result);
    }
  }
  ai.computer = 0;
  ai.response();
}

playEVE(getAI())
