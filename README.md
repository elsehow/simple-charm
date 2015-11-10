# simple charm

live-code with event emitters

## why

livecoding is [really great](http://toplap.org/bricolage-the-world-of-live-coding/)

long history in lisp and all that, still a core priority in clojure and clojurescript

in javascript, event emitters are at the core of most asynchronous operations. i personally deal with streaming biosensor data, which sometimes comes over a bluetooth connection (serial) and sometimes through a websocket. in both cases, i need to parse and process the data. 

simple-charm lets you live-code with event emitters in node

use this to mix-and-match various types of emitters - [sockets](https://github.com/maxogden/websocket-stream), [serial connections](https://www.npmjs.com/package/serialport2), [any node stream](https://github.com/substack/stream-handbook), what have you

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

map, filter, scan, [whatever](https://rpominov.github.io/kefir/), and log as you go - everything will "just work"

## api

single stream:

### charm(path, emitter, event)

or multiple streams:

### charm(path, [emitter, event], [emitter2, event2], ...)

path refers to some file that exposes a function.
the arguments to this function will be Kefir streams, 
 one for each `[emitter, event]` pair passed to charm.

this function returns a Kefir stream as well - 
a stream of return values from the function in app.js
every time app.js is saved and hot-reloaded, 
the new return value is emitted into to this stream.

see examples/logging/ for one use case of this

## debugging

be sure to pass `charm` the absolute path of your script. see example.

also, be sure to include change_code=1 at the bottom of every app.js

    module.change_code = 1   

this allows us to hotswap the functions on change.

## LICENSE

BSD-2-Clause
