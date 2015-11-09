/* SIMPLE CHARM
 * elsehow
 * github.com/elsehow/simple-charm
 * BSD license
 * 
 * 
 * usage:
 *
 *  charm = require('simple-charmer')
 *  charm('./app.js', [process.stdout, 'data'], [socket, 'eeg'])
 *
 * api
 *
 */

var hotswap = require('hotswap') //overrides `require`
  , path = require('path')

module.exports = function (path, ...emitters) {

  function bootstrap (app) {
    emitters.forEach((emitter) => {
      emitter.removeAllListeners()
    })
    app(emitter)
  }
  
  var a = require(path.join(__dirname, path) )
  bootstrap(a)
  hotswap.on('swap', function () {
    bootstrap(a)
    console.log('successfully hotswapped! :)')
  })

}
