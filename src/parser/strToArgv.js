const strToArgv = (string) => {
  const argv = []

  let inString = null
  let token    = ''

  for (let i = 0; i < string.length; i++) {
    const ch = string[i]

    if (!isLinebreak(ch)) {
      if (inString === null) {
        if (isStringLiteral(ch)) {
          inString = ch
        } else if (isWhitespace(ch)) {
          argv.push(token)
          token = ''
        } else {
          token += ch
        }
      } else {
        if (ch === inString) {
          inString = null
        } else {
          token += ch
        }
      }
    }
  }

  if (token !== '') argv.push(token)

  return argv
}

module.exports = {
  strToArgv
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