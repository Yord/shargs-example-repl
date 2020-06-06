const {parserSync} = require('shargs')
const {restrictToOnly} = require('shargs-parser')

const parser = parserSync({
  toArgv,
  opts: [restrictToOnly],
  fromArgs
})

module.exports = {
  parser
}

function toArgv (str) {
  return {
    errs: [],
    argv: strToArgv(str)
  }
}

function fromArgs ({errs, args}) {
  return {
    errs,
    args: typeof args[1] === 'undefined' ? args[0] : args[1]
  }
}

function strToArgv (string) {
  const argv = []

  let inString = false
  let token    = ''

  for (let i = 0; i < string.length; i++) {
    const ch = string[i]

    if (!isLinebreak(ch)) {
      if (inString) {
        if (isStringLiteral(ch)) {
          inString = false
        } else {
          token += ch
        }
      } else {
        if (isStringLiteral(ch)) {
          inString = true
        } else if (isWhitespace(ch)) {
          argv.push(token)
          token = ''
        } else {
          token += ch
        }
      }
    }
  }

  if (token !== '') argv.push(token)

  return argv
}


function isLinebreak (ch) {
  return ch === '\n'
}

function isStringLiteral (ch) {
  return ch === '"' || ch === "'"
}

function isWhitespace (ch) {
  return ch === ' '
}