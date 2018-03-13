const path = require('path')
const fs = require('fs')
const solc = require('solc')

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol') // Path to file
const source = fs.readFileSync(inboxPath, 'utf8')

console.log('inboxPath = ' + inboxPath)
console.log('compileSource: ' + source)

console.log('Compiling...')
let compilation = solc.compile(source, 1)
console.log('Result: ' + JSON.stringify(compilation))
module.exports = compilation.contracts[':Inbox']
