import {Branch, BranchCollection, dieBranches, createCanvas, initialBranch, pointsGenerator} from "./newTree"
import {drawProgressbar, drawCircle} from "./progressBar"
export {canvas1, ctx1, branches, oldBranches, canvas2, ctx2, canvas3, ctx3, canvas4, ctx4, enter}

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


let branches = new BranchCollection()
let oldBranches = new dieBranches()

//Status
let progress = 0
let cnt = 0
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
enter.innerHTML = "Enter"

enter.onclick = function() {
  enter.style.display = "none"
  drawCircle()
  let timer = setInterval(() => {
    if (progress >= oldBranches.oldBranchesX.length) {
      clearInterval(timer)
    }
    if (oldBranches.oldBranchesCategory[progress] === "trunk") {
      drawProgressbar(progress, oldBranches.oldBranchesX.length)
      ctx1.fillStyle = "#946A2C"
      ctx1.shadowcolor = "#946A2C"
      ctx1.shadowBlur = 2
      ctx1.beginPath()
      ctx1.moveTo(oldBranches.oldBranchesX[progress], oldBranches.oldBranchesY[progress])
      ctx1.arc(oldBranches.oldBranchesX[progress], oldBranches.oldBranchesY[progress], oldBranches.oldBranchesR[progress], 0, 2*Math.PI, true)
      ctx1.closePath()
      ctx1.fill()
    }
    if (oldBranches.oldBranchesCategory[progress] === "leaf") {
      drawProgressbar(progress, oldBranches.oldBranchesX.length)
      if (cnt % 3 === 0 && cnt > 150) {
        let leaf = new Image()
        let p = Math.random() * 3
        let k = 0
        if (p < 1) {
          leaf.src = "./assets/leaf-1.png"
          k = 1
        } else if (p < 2) {
          oldBranches.oldBranchesX[progress] = oldBranches.oldBranchesX[progress] - 20
          leaf.src = "./assets/leaf-4.png"
          k = 2
        } else if (p < 3) {
          oldBranches.oldBranchesX[progress] = oldBranches.oldBranchesX[progress] - 10
          leaf.src = "./assets/leaf-1.png"
          k = 2
        }
        ctx2.drawImage(leaf, oldBranches.oldBranchesX[progress], oldBranches.oldBranchesY[progress], 10 * k, 10 * k)
      }
      cnt++
    }
    console.log(progress)
    progress = progress + 1
  }, 10)
}
