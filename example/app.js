var Kefir = require('kefir')

module.exports = function (emitter) {

  var stream = Kefir.fromEvents(emitter, 'data')

  function timesTwo (x) { return x*2 }
  
  stream.map(timesTwo).log()

}

module.change_code = 1
