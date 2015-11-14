# simple charm

live-code with event emitters

## installation

    npm install simple-charm

## why

livecoding is [really great](http://toplap.org/bricolage-the-world-of-live-coding/)

long history in lisp and all that, still a core priority in clojure and clojurescript

in javascript, event emitters are at the core of most asynchronous operations. i personally deal with streaming biosensor data, which sometimes comes over a bluetooth connection (serial) and sometimes through a websocket. in both cases, i need to parse and process the data. 

### live-coding with emitters

simple-charm lets you live-code with event emitters in node

it turns the events from an emitter into [Kefir streams](https://rpominov.github.io/kefir/) - a flexible, discretized data sturcture that lets you map, filter, buffer, etc... across many values over time.

then, you write a script that processes the stream. you can change this script in real time, and your emitter's values will be sent through updated versions, without a hitch.

use this to mix-and-match various types of emitters - [sockets](https://github.com/maxogden/websocket-stream), [serial connections](https://www.npmjs.com/package/serialport2), [any node stream](https://github.com/substack/stream-handbook), what have you

may it serve you well

## usage:

in one file (index.js):

```javascript
var charm = require('simple-charm')
  , spawn = require('child_process').spawn

function pathTo (filename) { 
  return require('path').join(__dirname, filename)
}

// one-script prints 1 to process.stdout, over and over
var process  = spawn('node', [pathTo('one-script.js')])

// `charm` em with app.js
var app = pathTo('/app.js')
// make sure to pass an absolute path
charm(app, process.stdout, 'data')
```

in another file (app.js):
 
```javascript
module.exports = function (oneStream) {
  function addTwo (x) { return x+2 }
  var threeStream = oneStream.map(addTwo)
  threeStream.log()
}
```

now you can `node index.js` and, while it's running, live-code app.js!

map, filter, scan, [whatever](https://rpominov.github.io/kefir/), and log as you go - everything will "just work"

see examples/ for working with multiple streams, returning stuff back to inde.js (e.g. for logging), etc.

## api

single stream:

### charm(path, emitter, event)

or multiple streams:

### charm(path, [emitter, event], [emitter2, event2], ...)

path refers to some file that exposes a function.
the arguments to this function will be Kefir streams, 
 one for each `[emitter, event]` pair passed to charm.

see examples/multiple-streams/ for an example with multiple in-streams

this function returns a Kefir stream as well - 
a stream of return values from the function in app.js
every time app.js is saved and hot-reloaded, 
the new return value is emitted into to this stream.

see examples/logging/ for one use case of this

## debugging

be sure to pass `charm` the absolute path of your script. see example.

## LICENSE

BSD-2-Clause
