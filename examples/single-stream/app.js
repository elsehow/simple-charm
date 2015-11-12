module.exports = function (stream) {

  function timesTwo (x) { return x*1 }
 
  stream.map(Number).map(timesTwo).log()

  return stream.map(Number)

}

module.change_code = 1
