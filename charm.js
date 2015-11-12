/* SIMPLE CHARM
 * elsehow
 * github.com/elsehow/simple-charm
 * BSD license
 */

var path = require('path')
  , hotswap = require('hotswap') //overrides `require`
  , EventEmitter = require('events').EventEmitter
  , Kefir = require('kefir')

// api:
//
//   charm(app, [emitter, event], ...)
//
module.exports = function () {

  // inelegant spread operator
  var argsList =  []
  for (var i=0;i<arguments.length;i++) {
    argsList.push(arguments[i])
  }
  // the script user puts in 
  var app = argsList[0]
  // the pairs of [emitter, event]
  var emitEventPairs = argsList.slice(1)
  // if the user was using the single-stream api, turn this arg into a list
  if (!emitEventPairs[0].length)
    emitEventPairs = [emitEventPairs]

  // we run this fn at startup, 
  // and on reload (when the script is saved)
  function bootstrap (app) {
    // remove all our old listeners from the emitters
    emitEventPairs.forEach(function (p) {
      p[0].removeAllListeners(p[1])
    })
    // turn the pairs into Kefir streams
    var emitters = emitEventPairs.map(function (p) {
      return Kefir.fromEvents(p[0], p[1])
    })

    // TODO
    // first, we parse the app script for errors
    // if we catch one, we print it instead of crashing!

    // next, we try/catch executing the function
    try {
      return app.apply(null, emitters)
    } catch (e) {
      // if there's an execution error, we log it instead of crashing!
      console.error('Error!', e)
      return
    }
  }
  
  // we also create + return a Kefir stream
  // where each value in the stream is the return value of `app`
  // at the time it was saved
  var emitter = new EventEmitter()
  var returnValStream = Kefir.fromEvents(emitter, 'return-val')
  var a = require(app)
  function startApp () {
    var v = bootstrap(a)
    emitter.emit('return-val', v)
  }

  // we set up the hot-reload functionality here
  startApp()
  hotswap.on('swap', function () {
    startApp()
  })

  // return the stream of return values
  return returnValStream

}
