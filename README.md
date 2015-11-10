# simple charm

live-code with event emitters

## why

livecoding is [really great](http://toplap.org/bricolage-the-world-of-live-coding/)

long history in lisp and all that, still a core priority in clojure and clojurescript

simple-charm lets you live-code with event emitters in node

use this to mix-and-match various types of emitters - [sockets](), [serial connections](), what have you

may it serve you well

## usage:

in one file (example.js):

    var spawn = require('child_process').spawn
      , path = require('path')
      , charm = require('..')
    
    // one-script prints 1 to process.stdout, over and over
    var process1 = spawn('node', [path.join(__dirname, 'one-script.js')])
    // one-script prints 2 to process.stdout, over and over
    var process2 = spawn('node', [path.join(__dirname, 'two-script.js')])
    
    // `charm` em with app.js
    var app = path.join(__dirname, '/app.js')
    // make sure to pass an absolute path
    s = charm(app, [process1.stdout, 'data'], [process2.stdout, 'data'])
    
    // `charm` will return a stream of whatever app.js returns
    // one value in the stream for every time app.js was changed
    s.log('charm returned')

in another (app.js):
 
    module.exports = function (oneStream, twoStream) {
      var threeStream = oneStream.combine(twoStream, +)
      threeStream.log()
    }

    module.change_code = 1   // important - don't forget

now you can `node index.js` and, while it's running, live-code app.js

map, filter, scan, [whatever](), and log as you go - everything will "just work"

## api

    charm(path, [emitter, event], ...) 

path refers to some file that exposes a function.
the arguments to this function will be Kefir streams, 
 one for each `[emitter, event]` pair passed to charm.

this function returns a Kefir stream as well - 
a stream of return values from the function in app.js
every time app.js is saved and hot-reloaded, 
the new return value is emitted into to this stream.

be sure to pass `charm` the absolute path of your script. see example.

