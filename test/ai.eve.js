import {
  RESULT,
  ChessAI,
  move2Iccs
} from '../dist/ai'

const parseResult = (result) => (
  {
    [RESULT.WIN]: 'win',
    [RESULT.LOSS]: 'loss',
    [RESULT.DRAW]: 'draw',
    [RESULT.UNKNOWN]: 'unknown'
  }[result]
)

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
      console.log('EVE.result', parseResult(ai.result));
    }
  }
  ai.computer = 0;
  ai.response('init');
}

playEVE(getAI());
