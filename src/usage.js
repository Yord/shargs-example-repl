const {desc, optsDef, optsLists, space, synopsis, usage} = require('shargs/usage')

const style = {
  line: [{width: 80}],
  cols: [{width: 25, padEnd: 2}, {width: 53}]
}

const replDocs = cmd => optsLists(cmd)(style)

const cmdDocs = cmd => usage([synopsis, space, optsDef, space, desc])(cmd)(style)

module.exports = {
  cmdDocs,
  replDocs
}