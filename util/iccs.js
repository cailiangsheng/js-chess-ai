
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

const iccs2pos = (iccs) => {
  const regexp = /([A-Za-z]{1})(\d{1})/
  const result = iccs.match(regexp)
  if (result) {
    const cellIndex = result[1].toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0)
    const rowIndex = 9 - parseInt(result[2])
    return {
      rowIndex,
      cellIndex
    }
  }
}

const pos2iccs = (position) => {
  const name = String.fromCharCode(position.cellIndex + 'A'.charCodeAt(0))
  const index = 9 - position.rowIndex
  return `${name}${index}`
}

export {
  iccs2sq,
  iccs2sqs,
  iccs2pos,
  pos2iccs
}
