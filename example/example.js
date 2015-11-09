var Kefir = require('kefir')
  , spawn = require('child_process').spawn
  , path = require('path')
  , charm = require('..')

var process = spawn('node', [path.join(__dirname, 'stream.js')])

charm(process.stdout, path.join(__dirname + '/app.js'))
