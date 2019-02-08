const PIECE = {
  '俥': 'R', // red rook
  '傌': 'N', // red knight
  '相': 'B', // red bishop
  '仕': 'A', // red advisor
  '帥': 'K', // red king
  '炮': 'C', // red cannon
  '兵': 'P', // red pawn
  '卒': 'p', // black pawn
  '砲': 'c', // black cannon
  '車': 'r', // black rook
  '馬': 'n', // black knight
  '象': 'b', // black bishop
  '士': 'a', // black advisor
  '將': 'k'  // black king
}

const toFen = (chessmans) => {
  let fen = ''
  for (let rowIndex = 0; rowIndex < 10; rowIndex++) {
    if (rowIndex !== 0) {
      fen = fen + '/'
    }
    let numEmpty = 0
    for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
      const chessman = chessmans.find(c => c.position.rowIndex === rowIndex && c.position.cellIndex === cellIndex)
      if (chessman) {
        if (numEmpty) {
          fen = fen + numEmpty
          numEmpty = 0
        }
        fen = fen + PIECE[chessman.name]
      } else {
        numEmpty++
      }
    }
    if (numEmpty) {
      fen = fen + numEmpty
      numEmpty = 0
    }
  }
  return fen
}

const toChessmans = (fen) => {
  return []
}

export {
  toFen,
  toChessmans
}
