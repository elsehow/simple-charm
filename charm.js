/* SIMPLE CHARM
 * elsehow
 * github.com/elsehow/simple-charm
 * BSD license
 */

var path = require('path')
  , hotswap = require('hotswap') //overrides `require`
  , EventEmitter = require('events').EventEmitter
  , Kefir = require('kefir')

module.exports = function () {

  // in-elegant spread operator
  var argsList =  []
  for (var i=0;i<arguments.length;i++) {
    argsList.push(arguments[i])
  }
  // script user puts in 
  var inScript = argsList[0]
  // pairs of [emitter, event]
  var emitEventPairs = argsList.slice(1)

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
    return app.apply(null, emitters)
  }
  
  // we set up the hot-reload functionality here
  // in doing so, we also create + return a Kefir stream
  // where each value is something that
  var emitter = new EventEmitter()
  var a = require(inScript)
  var v = bootstrap(a)
  emitter.emit('return-val', v)
  hotswap.on('swap', function () {
    var v = bootstrap(a)
    emitter.emit('return-val', v)
    console.log('charmed! :)')
  })
  return Kefir.fromEvents(emitter, 'return-val')
}
