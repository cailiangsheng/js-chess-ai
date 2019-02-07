
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

export {
  iccs2sq,
  iccs2sqs
}
