import {
  ChessAI,
  move2Iccs
} from '../dist/ai'

const iccs2sq = (iccs) => {
  const regexp = /([A-Za-z]{1})(\d{1})/
  const result = iccs.match(regexp)
  if (result) {
    const r1 = result[1].toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0)
    const r2 = parseInt(result[2])
    return (r1 + 3) + (9 - r2 + 3) * 16
  }
}

const iccs2sqs = (iccs) => {
  return iccs.split('-').map(iccs2sq)
}

describe('ChessAI', () => {
  let ai
  let iccsList = []

  before(() => {
    ai = new ChessAI();
    ai.setSearch(16);
    ai.millis = 10;
    ai.computer = 1;
    ai.onAddMove = function () {
      var counter = (ai.pos.mvList.length >> 1);
      var space = (counter > 99 ? "    " : "   ");
      counter = (counter > 9 ? "" : " ") + counter + ".";
      var iccs = move2Iccs(ai.mvLast)
      var text = (ai.pos.sdPlayer == 0 ? space : counter) + iccs;
      var value = "" + ai.mvLast;
      console.log('TEST.onAddMove', value, text)
      iccsList.push(iccs)
    }
  })

  it('iccs to square', () => {
    expect(iccs2sq('A0')).to.equal(195)
    expect(iccs2sq('A1')).to.equal(179)
    expect(iccs2sq('I0')).to.equal(203)
    expect(iccs2sq('I1')).to.equal(187)
    expect(iccs2sq('H2')).to.equal(170)
    expect(iccs2sq('H9')).to.equal(58)
  })

  it('click squares', (done) => {
    ai.clickSquare(iccs2sq('H2'))
    ai.clickSquare(iccs2sq('E2'))
    setTimeout(() => {
      expect(iccsList).to.have.length(2)
      expect(iccsList[0]).to.equal('H2-E2')
      done()
    }, 1500)
  })
})
