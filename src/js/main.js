import {BranchCollection, dieBranches, createCanvas, initialBranch, pointsGenerator, drawTree} from "./newTree"
import {drawCircle} from "./progressBar"
import {drawtimeCounter} from "./timeCounter"
import {weatherCondition} from "./weatherCondition"

export {canvas1, ctx1, branches, oldBranches, canvas2, ctx2, 
  canvas3, ctx3, canvas4, ctx4, canvas5, ctx5, canvas6, ctx6, canvas7, ctx7, enter, weather}

window.addEventListener("load", main)
let canvas1 = document.createElement("canvas")
canvas1.className = "canvas1"
let ctx1 = canvas1.getContext("2d")
let canvas2 = document.createElement("canvas")
canvas2.className = "canvas2"
let ctx2 = canvas2.getContext("2d")
let canvas3 = document.createElement("canvas")
let ctx3 = canvas3.getContext("2d")
canvas3.className = "canvas3"
let canvas4 = document.createElement("canvas")
let ctx4 = canvas4.getContext("2d")
canvas4.className = "canvas4"
let canvas5 = document.createElement("canvas")
let ctx5 = canvas5.getContext("2d")
canvas5.className = "canvas5"
let canvas6 = document.createElement("canvas")
let ctx6 = canvas6.getContext("2d")
canvas6.className = "canvas6"
let canvas7 = document.createElement("canvas")
let ctx7 = canvas7.getContext("2d")
canvas7.className = "canvas7"

//Objects
let branches = new BranchCollection()
let oldBranches = new dieBranches()

//Status
let progress = 0
let cnt = 0
let time = 0
let weather = "sunny"
let isLoaded = false

/**
 * Executive function
 * @function
 */
function main() {
  createCanvas(window.innerWidth, window.innerHeight)
  initialBranch()
  pointsGenerator(isLoaded)
}

let enter = document.createElement("button")
document.body.appendChild(enter)
enter.className = "btn-enter"
enter.innerHTML = "Start"

let list = document.getElementById("list")

enter.onclick = function() {
  canvas4.style.display = "none"
  enter.style.display = "none"
  list.style.display = "inline"
  drawCircle()
  ctx1.fillStyle = "#1CDDB1"
  ctx1.textAlign = "center"
  ctx1.font = "15px Governor"
  ctx1.fillText("Version 1.0", 0.95 * canvas4.width, 0.99 * canvas4.height)
  drawTree(progress, cnt, 10)
  drawtimeCounter(time)
  weatherCondition(weather)
}
