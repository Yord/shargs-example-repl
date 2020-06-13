const {subcommand, command, string, stringPos, variadic} = require('shargs-opts')

const echoCmd = subcommand([
  stringPos('text', {desc: 'This text is echoed.', descArg: 'TEXT'})
])

const caseCmd = subcommand([
  stringPos('text', {desc: 'This text is transformed into upper or lower case.'}),
  string('mode', ['--mode'], {only: ['upper', 'lower'], desc: 'How to transform the text.'})
])

const opts = [
  echoCmd('echo', ['echo'], {action: echoF, desc: 'Echos a string.'}),
  caseCmd('case', ['case'], {action: caseF, desc: 'Transforms its argument into upper or lower case depending on the --mode.'}),
  variadic('help', ['help'], {action: helpF, desc: 'Print usage documentation.'})
]

const commands = command('shargs', opts, {desc: 'Welcome to the shargs REPL. Type "help" to see all available commands.'})

module.exports = {
  commands
}

function echoF ({text}) {
  return text
}

function caseF ({text = '', mode}) {
  switch (mode) {
    case 'upper': return text.toUpperCase()
    case 'lower': return text.toLowerCase()
    default:      return text
  }
}

const {desc, optsDef, optsLists, space, synopsis, usage} = require('shargs-usage')

function helpF (command) {
  const subDocs = usage([synopsis, space, optsDef, space, desc])
  
  const style = {
    line: [{width: 80}],
    cols: [{width: 25, padEnd: 2}, {width: 53}]
  }

  if (Array.isArray(command) && command.length === 0) {
    return optsLists(commands)(style)
  }

  const command2 = Array.isArray(command) ? command : [command]
  const subcommands = commands.opts.filter(({key}) => command2.includes(key))
  const helps = subcommands.map(cmd => subDocs(cmd)(style))
  return helps.join('\n')
}