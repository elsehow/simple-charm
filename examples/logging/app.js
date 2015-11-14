module.exports = function (stream) {

  function timesTwo (x) { return x*2 }
 
  var s = stream.map(Number).map(timesTwo).log()

  return s

}
