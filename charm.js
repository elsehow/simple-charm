/* SIMPLE CHARM
 * elsehow
 * github.com/elsehow/simple-charm
 * BSD license
 */

var charm = require('easy-charm')
  , Kefir = require('kefir')
  , clc = require('cli-color');

function printError (e) {
  console.log(clc.red('\n'+e+'\n'))
}

// api:
//
// single emitter:
//
//   charm(absolutePathToFile, emitter, event)
//   
// multiple emitters:
//
//   charm(absolutePathToFile, [emitter, event], [emitter2, event2], ...)

module.exports = function () {

  // inelegant spread operator
  var argsList =  []
  for (var i=0;i<arguments.length;i++) {
    argsList.push(arguments[i])
  }

  function kefirStream (emitter, ev) {
    return Kefir.fromEvents(emitter, ev)
  }

  argsList.push(kefirStream)

  var em = charm.apply(null, argsList)

  // log errors
  em.on('error', printError)

  return Kefir.fromEvents(em, 'return-val')
  
  // we also create + return a Kefir stream
  // where each value in the stream is the return value of `app`
  // at the time it was saved
  var emitter = new EventEmitter()
  var returnValStream = Kefir.fromEvents(emitter, 'return-val')

}
