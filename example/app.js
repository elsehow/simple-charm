var Kefir = require('kefir')

module.exports = function (oneStream, twoStream) {

  function timesTwo (x) { return x*2 }
  
  var fours = oneStream.map(timesTwo).combine(twoStream, +)

  return fours

}

module.change_code = 1
