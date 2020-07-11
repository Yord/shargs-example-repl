const {command}     = require('shargs-opts')
const {case: _case} = require('./case')
const {echo}        = require('./echo')
const {help}        = require('./help')

const opts = [
  echo,
  _case,
  help
]

const commands = command('shargs', opts, {desc: 'Welcome to the shargs REPL. Type "help" to see all available commands.'})

module.exports = {
  commands
}