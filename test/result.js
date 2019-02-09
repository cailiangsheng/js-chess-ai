import { RESULT } from '../dist/ai'

const parseColor = (fen) => {
  const color = fen.charAt(fen.length - 1)
  return color === 'b' ? 'Black' : 'Red'
}

const parseResult = (result) => (
  {
    [RESULT.WIN]: 'win',
    [RESULT.LOSS]: 'loss',
    [RESULT.DRAW]: 'draw',
    [RESULT.UNKNOWN]: 'unknown'
  }[result]
)

const getResult = (ai) => {
  const color = parseColor(ai.pos.toFen())
  if (ai.result !== RESULT.UNKNOWN) {
    return `${color} ${parseResult(ai.result)}`
  }
  if (ai.pos.isMate()) {
    return `${color} loss`
  }
  return 'unknown result'
}

export {
  getResult
}
