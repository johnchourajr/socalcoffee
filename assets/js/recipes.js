function chemexmath() {
  var c = document.querySelector("input.chemex-coffee").value
  var w = c * RATIO
  var bypass = w / BYPASS
      w = w + bypass
  var preinfuse = c * 2
  var goal = w - bypass - preinfuse
  var pour = goal / 4
  var pour1 = pour * 2
  var pour2 = pour * 4

  changeByClass("strong", "chemex-coffeegrams", c)
  changeFormById("chemex-water", 'value', w)
  changeByClass("strong", "chemex-bypass", bypass)
  changeByClass("strong", "chemex-preinfuse", preinfuse)
  changeByClass("strong", "chemex-pour1", pour1)
  changeByClass("strong", "chemex-pour2", pour2)
}

function pourovermath() {
  var c = document.querySelector("input.pourover-coffee").value
  var w = c * RATIO
  var preinfuse = c * 2
  var pour1 = c * 5
  var pour2 = c * 8.3333333333
  var pour3 = c * 11.6666666667

  changeByClass("strong", "pourover-coffeegrams", c)
  changeFormById("pourover-water", 'value', w)
  changeByClass("strong", "pourover-preinfuse", preinfuse)
  changeByClass("strong", "pourover-pour1", pour1)
  changeByClass("strong", "pourover-pour2", pour2)
  changeByClass("strong", "pourover-pour3", pour3)
}

function frenchpressmath() {
  var vol = document.querySelector("input.frenchpress-container").value
  var volInterpret = vol === '1' ? 16 : vol === '2' ? 32 : vol === '3' ? 51 : 24
  var volCups = volInterpret / 4
  var volStr = `${volInterpret} oz (${volCups} cups)`
  var mlConvert = 29.5757
  var w = Math.round(volInterpret * mlConvert)
  var c = w / 15
  var preinfuse = c * 2
  var pour1 = (w) - preinfuse

  outputUpdate(volStr)
  changeFormById("frenchpress-coffee", 'value', c)
  changeFormById("frenchpress-water", 'value', w)
  changeByClass("strong", "frenchpress-coffee", c)
  changeByClass("strong", "frenchpress-preinfuse", preinfuse)
  changeByClass("strong", "frenchpress-pour1", pour1)
}

function aeropressmath() {
  var c = document.querySelector("input.aeropress-coffee").value
  var w = c * RATIO
  var pour = w

  changeFormById("aeropress-water", 'value', w)
  changeByClass("strong", "aeropress-pour", pour)
}
