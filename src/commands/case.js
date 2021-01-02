const {subcommand, string, stringPos} = require('shargs/opts')

const cmd = subcommand([
  stringPos('text', {desc: 'This text is transformed into upper or lower case.'}),
  string('mode', ['--mode'], {only: ['upper', 'lower'], desc: 'How to transform the text.'})
])

const _case = cmd('case', ['case'], {action, desc: 'Transforms its argument into upper or lower case depending on the --mode.'})

module.exports = {
  case: _case
}

function action ({text = '', mode}, errs) {
  let out = ''

  switch (mode) {
    case 'upper': out = text.toUpperCase(); break
    case 'lower': out = text.toLowerCase(); break
    default:      out = text;               break
  }

  if (errs.length > 0) {
    const err = errs.map(({code, msg}) => `${code}: ${msg}`).join('\n')
    console.log(`${err}\n`)
  }

  console.log(out)
}