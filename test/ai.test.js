import {
  ChessAI,
  move2Iccs
} from '../dist/ai'

import {
  iccs2sq,
  iccs2sqs
} from './util'

describe('ChessAI', () => {
  let ai
  let iccsList = []

  before(() => {
    ai = new ChessAI();
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
  })

  it('parse iccs to square', () => {
    expect(iccs2sq('A0')).to.equal(195)
    expect(iccs2sq('A1')).to.equal(179)
    expect(iccs2sq('I0')).to.equal(203)
    expect(iccs2sq('I1')).to.equal(187)
    expect(iccs2sq('H2')).to.equal(170)
    expect(iccs2sq('H9')).to.equal(58)
  })

  it('click squares to move', (done) => {
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
})
