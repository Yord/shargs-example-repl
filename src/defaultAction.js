const defaultAction = (rest, errs) => {
  if (rest.length > 0) {
    const err = `Unknown command "${rest[0]}"!`
    console.log(err)
  } else if (errs.length > 0) {
    const err = errs.map(({code, msg}) => `${code}: ${msg}`).join('\n')
    console.log(err)
  }
}

module.exports = {
  defaultAction
}