const defaultAction = (rest, errs) => {
  if (errs.length > 0) {
    const err = errs.map(({code, msg}) => `${code}: ${msg}`).join('\n')
    console.log(err)
  }
}

module.exports = {
  defaultAction
}