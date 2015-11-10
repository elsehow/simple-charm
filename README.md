# simple charm

live-code with event emitters

## why

livecoding is [really great](http://toplap.org/bricolage-the-world-of-live-coding/)

long history in lisp and all that, still a core priority in clojure and clojurescript

simple-charm lets you live-code with event emitters in node

use this to mix-and-match various types of emitters - [sockets](), [serial connections](), what have you

may it serve you well

## usage:

index.js:

    var charm = require('simple-charmer')
     , spawn = require('child_process')
    
    var process1 = spawn('bash', ['some-script.sh'])
    var process2 = spawn('bash', ['some-other-script.sh'])

    charm('./app.js', [process.stdout, 'data'], [socket, 'eeg'])

app.js:
 
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

argument to this function will be a Kefir stream, 
 one for each `[emitter, event]` pair passed to charm.

