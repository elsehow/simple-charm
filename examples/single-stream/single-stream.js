var spawn = require('child_process').spawn
  , path = require('path')
  , charm = require('../..')

var process = spawn('node', [path.join(__dirname, 'random-stream.js')])

// `charm` em with app.js
var app = path.join(__dirname, '/app.js')
// make sure to pass an absolute path
s = charm(app, process.stdout, 'data')

// `charm` will return a stream of whatever app.js returns
// one value in the stream for every time app.js was changed
s.log('charm returned')
