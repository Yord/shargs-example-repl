const {strToArgv} = require('./strToArgv')

test('strToArgv works without string literals', () => {
  const string = 'foo bar baz\n'

  const res = strToArgv(string)

  const exp = ['foo', 'bar', 'baz']

  expect(res).toStrictEqual(exp)
})

test('strToArgv works with string literals 1', () => {
  const string = 'foo "bar baz"\n'

  const res = strToArgv(string)

  const exp = ['foo', 'bar baz']

  expect(res).toStrictEqual(exp)
})

test('strToArgv works with string literals 2', () => {
  const string = "foo 'bar baz'\n"

  const res = strToArgv(string)

  const exp = ['foo', 'bar baz']

  expect(res).toStrictEqual(exp)
})

