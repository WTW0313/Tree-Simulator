// import {createCanvas} from "./createCanvas.js"
// import {Branch} from "./tree/Branch.js"
// import {BranchCollection} from "./tree/BranchCollection.js"
// import {dieBranches} from "./tree/dieBranches.js"
// import {initialBranch} from "./tree/initialBranch.js"
// import {pointsGenerator} from "./tree/pointsGenerator.js"
import {Branch, BranchCollection, dieBranches, createCanvas, initialBranch, pointsGenerator} from "./newTree"
export {canvas, ctx, branches, oldBranches}

window.addEventListener("load", main)
let canvas = document.createElement("canvas")
let ctx = canvas.getContext("2d")
let branches = new BranchCollection()
let oldBranches = new dieBranches()

/**
 * Executive function
 * @function
 */
function main() {
  createCanvas(window.screen.width, window.screen.height)
  initialBranch()
  pointsGenerator()
}

/**
 * Click to draw
 * @function
 */
canvas.onclick = function() {
  canvas.height = canvas.height
  ctx.fillstyle = "#000000"
  ctx.strokeRect(0, 0, window.screen.width, window.screen.height)
  let i = 0
  let cnt = 0;
  let
  for (let i = 0;i < oldBranches.oldBranchesX.length;i++) {
    if (oldBranches.oldBranchesCategory[i] === "trunk") {
      let promise1 = new Promise(function (resolve, reject) {
        timer1 = setTimeout(function() {
          ctx.fillStyle = "#946A2C"
          ctx.shadowcolor = "#946A2C"
          ctx.shadowBlur = 2
          ctx.beginPath()
          ctx.moveTo(oldBranches.oldBranchesX[i], oldBranches.oldBranchesY[i])
          ctx.arc(oldBranches.oldBranchesX[i], oldBranches.oldBranchesY[i], oldBranches.oldBranchesR[i], 0, 2*Math.PI, true)
          ctx.closePath()
          ctx.fill()
          resolve()
        }, 10000)
      })
      promise1.then(() => {
        clearTimeout(timer1)
      })
    }
    else {
      let promise2 = new Promise(function (resolve, reject) {
        timer2 = setTimeout(function() {
          ctx.fillStyle = "#83AD50"
          ctx.shadowcolor = "#83AD50"
          ctx.shadowBlur = 2
          ctx.beginPath()
          ctx.moveTo(oldBranches.oldBranchesX[i], oldBranches.oldBranchesY[i])
          ctx.arc(oldBranches.oldBranchesX[i], oldBranches.oldBranchesY[i], 4, 0, 2*Math.PI, true)
          ctx.closePath()
          ctx.fill()
          resolve()
        }, 10000)
      })
      promise2.then(() => {
        clearTimeout(timer2)
      })
    }
  }
}
