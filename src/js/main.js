import {Branch, BranchCollection, dieBranches, createCanvas, initialBranch, pointsGenerator} from "./newTree"

export {canvas1, ctx1, branches, oldBranches, canvas2, ctx2}

window.addEventListener("load", main)
let canvas1 = document.createElement("canvas")
canvas1.className = "canvas1"
let ctx1 = canvas1.getContext("2d")
let canvas2 = document.createElement("canvas")
canvas2.className = "canvas2"
let ctx2 = canvas2.getContext("2d")
let branches = new BranchCollection()
let oldBranches = new dieBranches()
let save = { }
let i = 0
let cnt = 0

/**
 * Executive function
 * @function
 */
function main() {
  createCanvas(window.innerWidth, window.innerHeight)
  initialBranch()
  pointsGenerator()
}

/**
 * Draw the Tree
 * @function
 */
let drawTree = function() {
  let timer = setInterval(() => {
    if (i >= oldBranches.oldBranchesX.length) {
      clearInterval(timer)
    }
    if (oldBranches.oldBranchesCategory[i] === "trunk") {
      ctx1.fillStyle = "#946A2C"
      ctx1.shadowcolor = "#946A2C"
      ctx1.shadowBlur = 2
      ctx1.beginPath()
      ctx1.moveTo(oldBranches.oldBranchesX[i], oldBranches.oldBranchesY[i])
      ctx1.arc(oldBranches.oldBranchesX[i], oldBranches.oldBranchesY[i], oldBranches.oldBranchesR[i], 0, 2*Math.PI, true)
      ctx1.closePath()
      ctx1.fill()
    }
    if (oldBranches.oldBranchesCategory[i] === "leaf") {
      if (cnt % 3 === 0 && cnt > 150) {
        let leaf = new Image()
        let p = Math.random() * 3
        let k = 0
        if (p < 1) {
          leaf.src = "./assets/leaf-1.png"
          k = 1
        } else if (p < 2) {
          oldBranches.oldBranchesX[i] = oldBranches.oldBranchesX[i] - 20
          leaf.src = "./assets/leaf-4.png"
          k = 2
        } else if (p < 3) {
          oldBranches.oldBranchesX[i] = oldBranches.oldBranchesX[i] - 10
          leaf.src = "./assets/leaf-1.png"
          k = 2
        }
        ctx2.drawImage(leaf, oldBranches.oldBranchesX[i], oldBranches.oldBranchesY[i], 10 * k, 10 * k)
      }
      cnt++
    }
    console.log(i)
    i = i + 1
  }, 10)
}