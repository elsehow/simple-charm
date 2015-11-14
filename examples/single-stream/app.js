module.exports = function (stream) {

  stream
    .map(Number)
    .map(function (x) 
      return x
    })
    .log()
}

module.change_code = 1
