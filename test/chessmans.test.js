import {
  toFen,
  fromFen,
  fromIccs
} from '../util/chessmans'

import chessmans from './chessmans.test.json'

describe('chessmans', () => {
  const FEN = 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR'

  it('toFen', () => {
    expect(toFen(chessmans)).to.equal(FEN)
  })

  it('fromFen', () => {
    expect(toFen(fromFen(FEN))).to.equal(FEN)
  })

  it('fromIccs', () => {
    expect(fromIccs('A0-A9')).to.deep.equal([
      {
        rowIndex: 9,
        cellIndex: 0
      },
      {
        rowIndex: 0,
        cellIndex: 0
      }
    ])
  })
})
