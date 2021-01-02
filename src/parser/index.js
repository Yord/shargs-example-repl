const {parserSync} = require('shargs')
const {restrictToOnly} = require('shargs/parser')
const {strToArgv} = require('./strToArgv')

const lexer = parserSync({
  toArgv,
  opts: [restrictToOnly],
  toArgs: ({errs, opts}) => ({errs, args: opts}),
  fromArgs: ({errs, args}) => ({errs, opts: args})
})

const parser = parserSync({
  toArgv,
  opts: [restrictToOnly],
  fromArgs
})

module.exports = {
  lexer,
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
    args: typeof args[1] === 'undefined' ? args[0] : {...args[1], _: args[0]._}
  }
}