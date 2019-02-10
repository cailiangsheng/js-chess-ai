import {
  RESULT,
  ChessAI,
  move2Iccs
} from '../dist/ai'

import { iccs2sq, iccs2sqs } from '../util/iccs'
import { getResult } from '../util/result'

describe('ChessAI', () => {
  it('parse iccs to square', () => {
    expect(iccs2sq('A0')).to.equal(195)
    expect(iccs2sq('A1')).to.equal(179)
    expect(iccs2sq('I0')).to.equal(203)
    expect(iccs2sq('I1')).to.equal(187)
    expect(iccs2sq('H2')).to.equal(170)
    expect(iccs2sq('H9')).to.equal(58)
  })

  it('click squares to move', (done) => {
    const iccsList = [];
    const ai = new ChessAI();
    ai.setSearch(16);
    ai.millis = 10;
    ai.computer = 1;
    ai.onAddMove = function () {
      var numMoves = ai.pos.mvList.length - 1
      var iccs = move2Iccs(ai.mvLast)
      var isComputer = ai.pos.sdPlayer == 0
      var player = isComputer ? 'Computer' : 'Human'
      console.log('TEST.onAddMove', `#${numMoves}`, `[${iccs}]`, `(${player})`)
      iccsList.push(iccs)
    }

    const iccs = 'H2-E2'

    // do clicks
    iccs2sqs(iccs).forEach((sq) => ai.clickSquare(sq))

    // get moves
    setTimeout(() => {
      expect(iccsList).to.have.length(2)
      expect(iccsList[0]).to.equal(iccs)
      done()
    }, 1500)
  })

  it('mate position - red loss', (done) => {
    var ai = new ChessAI();
    ai.setSearch(16);
    ai.millis = 10;
    ai.onAddMove = sinon.spy();
    ai.pos.fromFen('3k5/4a4/9/9/2b6/9/9/3A1n3/4K4/2pn1A3 w');
    ai.computer = 0;
    ai.response();
    setTimeout(() => {
      expect(ai.onAddMove.callCount).to.equal(0);
      expect(ai.pos.isMate()).to.be.true;
      console.log(getResult(ai));
      done();
    }, 1500)
  })

  it('mate position - black loss', (done) => {
    var ai = new ChessAI();
    ai.setSearch(16);
    ai.millis = 10;
    ai.onAddMove = sinon.spy();
    ai.pos.fromFen('5Rb2/9/4bk3/p8/4C4/8p/9/8B/4A4/3AK4 b');
    ai.computer = 1;
    ai.response();
    setTimeout(() => {
      expect(ai.onAddMove.callCount).to.equal(0);
      expect(ai.pos.isMate()).to.be.true;
      console.log(getResult(ai));
      done();
    }, 1500)
  })

  it('draw position', (done) => {
    var ai = new ChessAI();
    ai.setSearch(16);
    ai.millis = 10;
    var response = ai.response;
    ai.response = function (reason) {
      reason && response.apply(ai);
    }
    ai.onAddMove = function () {
      var numMoves = ai.pos.mvList.length - 1;
      var iccs = move2Iccs(ai.mvLast)
      console.log('TEST.onAddMove', `#${numMoves}`, `[${iccs}]`);
      if (ai.result === RESULT.UNKNOWN) {
        ai.computer = 1 - ai.computer;
        ai.response('eve');
      } else {
        console.log('TEST.result', getResult(ai));
        expect(ai.result).to.equal(RESULT.DRAW);
        done();
      }
    };
    ai.pos.fromFen('3ak1b2/4a4/9/R3p1N1p/9/c1P1r4/9/4B4/4K4/3A5 b');
    ai.computer = 1;
    ai.response('init');
  })
})
