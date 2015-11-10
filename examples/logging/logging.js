var spawn = require('child_process').spawn
  , path = require('path')
  , charm = require('../..')
  , fs = require('fs')

var process = spawn('node', [path.join(__dirname, 'random-stream.js')])

// loggers will save to a file
// named after the time of the file-version
function logStream (stream) {
  // for appending a `value` to a file
  function writeToLog (value, filename) {
    var str = JSON.stringify(value) + '\n'
    fs.appendFile(filename, str)
  }
  // name the file after the current time
  var d     = new Date()
  var date  = d.toISOString()
  var fname = path.join(
      __dirname, 
      'logs', 
      date + '.txt')
  // we're setting up a new log here
  console.log('logging to', fname)
  // every time a value comes over this stream
  stream.onValue(function (v) {
    // write it to the log
    writeToLog(v, fname)
  })
}

// `charm` app.js
var app = path.join(__dirname, '/app.js')
// log every stream returned by the fn in '/app.js'
// here, `charm` is returning a stream of streams
charm(app, process.stdout, 'data')
  .onValue(logStream) 
