var Kefir = require('kefir')
  , spawn = require('child_process').spawn
  , path = require('path')
  , charm = require('..')

// one-script prints 1 to process.stdout, over and over
var process1 = spawn('node', [path.join(__dirname, 'one-script.js')])
// one-script prints 2 to process.stdout, over and over
var process2 = spawn('node', [path.join(__dirname, 'two-script.js')])

// charm em with app.js
s = charm('./app.js', process1.stdout, process2.stdout)

// `charm` will return a stream of whatever app.js returns
// one value in the stream for every time app.js was changed
s.log('charm returned')
