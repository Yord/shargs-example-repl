const {command, variadic} = require('shargs-opts')
const {case: _case}       = require('./case')
const {echo}              = require('./echo')
const {cmdDocs, replDocs} = require('../usage')

const help = variadic('help', ['help'], {action, desc: 'Print usage documentation.'})

const opts = [
  echo,
  _case,
  help
]

const commands = command('shargs', opts, {desc: 'Welcome to the shargs REPL. Type "help" to see all available commands.'})

module.exports = {
  commands
}

function action (command) {
  let help = ''

  if (Array.isArray(command) && command.length === 0) {
    help = replDocs(commands)
  } else {
    const command2 = Array.isArray(command) ? command : [command]
    const subcommands = commands.opts.filter(({key}) => command2.includes(key))
    const helps = subcommands.map(cmdDocs)
    help = helps.join('\n')
  }

  console.log(help)
}