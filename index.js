/* SIMPLE CHARM
 * elsehow
 * github.com/elsehow/simple-charm
 * BSD license
 *
 *
 *  TODO
 *  should return a stream of path()()'s values
 *
 */
var hotswap = require('hotswap') //overrides `require`
  , path = require('path')

module.exports = function (path, ...emitterEventPairs) {

  function bootstrap (app) {
    emitEventPairs.forEach(p => {
      p[0].removeAllListeners(p[1])
    })
    var emitters = emitEventPairs.map(p => p[0])
    app.apply(null, emitters)
  }
  
  var a = require(path.join(__dirname, path) )
  bootstrap(a)
  hotswap.on('swap', () => {
    bootstrap(a)
    console.log('charmed! :)')
  })

}
