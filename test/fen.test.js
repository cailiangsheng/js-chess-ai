import {
  toFen,
  toChessmans
} from './fen'

import chessmans from './chessmans.test.json'

describe('fen', () => {
  it('toFen', () => {
    expect(toFen(chessmans)).to.equal('rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR')
  })

  // it('toChessmans', () => {
  //   expect(toChessmans('rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR')).to.deep.equal(chessmans)
  // })
})
