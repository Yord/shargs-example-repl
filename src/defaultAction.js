const {replDocs} = require('./usage')

const defaultAction = commands => (rest, errs) => {
  if (errs.length > 0) {
    const err = errs.map(({code, msg}) => `${code}: ${msg}`).join('\n')
    console.log(`${err}\n\n${replDocs(commands)}`)
  }
}

module.exports = {
  defaultAction
}