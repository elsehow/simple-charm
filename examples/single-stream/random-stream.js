
var rando = Math.round(Math.random()*100)

setInterval(function () {
  process.stdout.write(rando + '\n')
}, 30)
