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
  let save = oldBranches.toJSONString()
  console.log(save)
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
  let timer = setInterval(() => {
    if (i >= oldBranches.oldBranchesX.length) {
      clearInterval(timer)
    }
    if (oldBranches.oldBranchesCategory[i] === "trunk") {
      ctx.fillStyle = "#946A2C"
      ctx.shadowcolor = "#946A2C"
      ctx.shadowBlur = 2
      ctx.beginPath()
      ctx.moveTo(oldBranches.oldBranchesX[i], oldBranches.oldBranchesY[i])
      ctx.arc(oldBranches.oldBranchesX[i], oldBranches.oldBranchesY[i], oldBranches.oldBranchesR[i], 0, 2*Math.PI, true)
      ctx.closePath()
      ctx.fill()
    }
    if (oldBranches.oldBranchesCategory[i] === "leaf") {
      ctx.fillStyle = "#83AD50"
      ctx.shadowcolor = "#83AD50"
      ctx.shadowBlur = 2
      ctx.beginPath()
      ctx.moveTo(oldBranches.oldBranchesX[i], oldBranches.oldBranchesY[i])
      ctx.arc(oldBranches.oldBranchesX[i], oldBranches.oldBranchesY[i], 4, 0, 2*Math.PI, true)
      ctx.closePath()
      ctx.fill()
    }
    console.log(i)
    i = i + 1
  }, 10)
}
