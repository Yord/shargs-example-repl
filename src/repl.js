const nodeRepl = require('repl')

const repl = (parser, commands) => {
  console.log(commands.desc ? commands.desc + '\n' : '')

  nodeRepl.start({
    prompt: `${commands.key}~$ `,
    ignoreUndefined: true,
    eval: eval(parser, commands),
    completer: completer(parser, commands)
  })
}

module.exports = {
  repl
}

function eval(parser, commands) {
  const parse = parser(commands)

  return (cmd, context, filename, callback) => {
    const {errs, args} = parse(cmd)

    const strings = Object.entries(args).map(([key, value]) => {
      const cmd = commands.opts.find(_ => _.args.includes(key)) || {action: _ => ''}
      const action = cmd.action || (_ => '')
      return action(value)
    })
    
    const output = (
      errs.length > 0 ? errs.map(({code, msg}) => `${code}: ${msg}`).join('\n')
                      : strings.join('\n')
    )
  
    console.log(output)
  
    callback(null, undefined);
  }
}

function completer (parser, commands) {
  const parse = parser(commands)

  return line => {
    if (line === '') {
      const args = flatMap(commands.opts, cmd => cmd.args)
      return [args, '']
    }

    const {errs, args} = parse(line)

    const {_, ...subcommands} = args

    let matches = getMatches(commands.opts, subcommands, _)

    if (line[line.length - 1] !== ' ' && matches.length === 1) {
      matches = matches.map(m => ' ' + m)
    }

    return [matches, '']
  }
}

function getMatches (opts, subcommands, rest) {
  return flatMap(Object.entries(subcommands), ([key, value]) => {
    const opts2 = opts.filter(_ => _.key === key)
    const args  = flatMap(opts2, cmd => flatMap(cmd.opts || [], _ => _.args || [`<${_.key}>`]))
    const only  = flatMap(opts2, cmd => flatMap(cmd.opts || [], _ => _.only || []))

    if (Array.isArray(value._)) {
      if (rest.length === 0) {
        return args
      } else {
        const foo = rest[0]

        if (args.includes(foo)) return only

        const started = args.filter(arg => arg.startsWith(foo))
        if (started.length > 0) return started
        else return []
      }
    } else {
      return getMatches(flatMap(opts2, opt => opt.opts), value, rest)
    }
  })
}

function flatMap (a, f) {
  return a.reduce(
    (acc, a) => [...acc, ...f(a)],
    []
  )
}