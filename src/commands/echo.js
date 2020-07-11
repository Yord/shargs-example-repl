const {subcommand, stringPos} = require('shargs-opts')

const cmd = subcommand([
  stringPos('text', {desc: 'This text is echoed.', descArg: 'TEXT'})
])

const echo = cmd('echo', ['echo'], {action, desc: 'Echos a string.'})

module.exports = {
  echo
}

function action ({text}) {
  console.log(text)
}