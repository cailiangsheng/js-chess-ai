import {
  ChessAI,
  move2Iccs
} from '../dist/ai'

describe('ChessAI', () => {
  let ai

  before(() => {
    ai = new ChessAI();
    ai.setSearch(16);
    ai.millis = 10;
    ai.computer = 1;
    ai.onAddMove = function () {
      var counter = (ai.pos.mvList.length >> 1);
      var space = (counter > 99 ? "    " : "   ");
      counter = (counter > 9 ? "" : " ") + counter + ".";
      var text = (ai.pos.sdPlayer == 0 ? space : counter) + move2Iccs(ai.mvLast);
      var value = "" + ai.mvLast;
      console.log('TEST.onAddMove', value, text)
    }
  })

  it('test move', (done) => {
    ai.clickSquare(170)
    ai.clickSquare(167)
    setTimeout(done, 1500)
  })
})
