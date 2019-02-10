import { RESULT } from '../dist/ai'

const parseColor = (fen) => {
  const color = fen.charAt(fen.length - 1)
  return color === 'b' ? 'black' : 'red'
}

const getResult = (ai) => {
  const winnerColor = getWinnerColor(ai)
  return winnerColor ? `winner is ${winnerColor}` : 'unknown result'
}

const getDifferentColor = (color) => {
  switch (color) {
    case 'red': return 'black'
    case 'black': return 'red'
    default: return color
  }
}

const getWinnerColor = (ai) => {
  const color = parseColor(ai.pos.toFen())
  switch (ai.result) {
    case RESULT.WIN:
      return color
    case RESULT.LOSS:
      return getDifferentColor(color)
    case RESULT.DRAW:
      return 'draw'
    case RESULT.UNKNOWN:
      if (ai.pos.isMate()) {
        return getDifferentColor(color)
      } else {
        const fen = ai.pos.toFen()
        const hasBlackKing = fen.includes('k')
        const hasRedKing = fen.includes('K')
        if (!hasBlackKing && hasRedKing) return 'red'
        else if (hasBlackKing && !hasRedKing) return 'black'
      }
  }
  return ''
}

export {
  getResult,
  getWinnerColor
}
