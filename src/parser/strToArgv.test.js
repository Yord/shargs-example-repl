const {strToArgv} = require('./strToArgv')

test('strToArgv works without string literals', () => {
  const string = 'foo bar baz\n'

  const res = strToArgv(string)

  const exp = ['foo', 'bar', 'baz']

  expect(res).toStrictEqual(exp)
})