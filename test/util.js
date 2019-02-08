import { RESULT } from '../dist/ai'

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
  getResult,
  iccs2sq,
  iccs2sqs
}
