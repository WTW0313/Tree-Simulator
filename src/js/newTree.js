import {canvas1, ctx1, branches, oldBranches, canvas2, ctx2, canvas3, ctx3,
  canvas4, ctx4, enter, canvas5, ctx5, canvas6, ctx6, canvas7, ctx7} from "./main"
import {loadingBar} from "./Loading"
import {drawProgressbar} from "./progressBar"
import {drawPercent} from "./drawPercent"
export {Branch, BranchCollection, dieBranches, createCanvas, initialBranch, pointsGenerator, drawTree}

/**
 * Branch类
 * @constructs
 * @param {number} x x-coordinate
 * @param {number} y y-coordinate
 * @param {number} radius The radius of a point
 * @param {number} angle The angle of deflection
 * @param {number} speed The speed of growth
 * @param {number} generation The generation of the branch
 * @param {number} distance The distance of a new point and an old point 
 */
let Branch = function() {
  this.x = canvas1.width / 2
  this.y = canvas1.height
  this.radius = 10
  this.angle = Math.PI / 2
  this.speed = canvas1.width / 500
  this.generation = 0
  this.distance = 0
}
Branch.prototype = {
  /**
   * Main painting function
   */
  process: function() {
    if (this.generation > 0) {
      this.drawPoints()
    }
    this.iterate()
    this.split()
    this.die()
  },
  /**
   * Draw a branch point
   */
  draw: function() {
    ctx1.fillStyle = "#946A2C"
    ctx1.shadowcolor = "#946A2C"
    ctx1.shadowBlur = 2
    ctx1.beginPath()
    ctx1.moveTo(this.x, this.y)
    ctx1.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true)
    ctx1.closePath()
    ctx1.fill()
  },
  /**
   * Draw a leaf point and record the point
   */
  drawPoints: function() {
    let p = Math.random()
    let theta = Math.PI / 2
    oldBranches.addX(this.x + 20 * p * Math.cos(theta * p))
    oldBranches.addY(this.y - 20 * p * Math.sin(theta * p))
    oldBranches.addR(4)
    oldBranches.addCate("leaf")
  },
  /**
   * Generate new a branch point and record the point
   */
  iterate: function() {
    let deltaX = this.speed * Math.cos(this.angle)
    let deltaY = - this.speed * Math.sin(this.angle)
    this.x += deltaX
    this.y += deltaY
    this.radius *= (0.99 - this.generation / 250)
    let deltaDistance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))
    this.distance += deltaDistance
    if (this.speed > this.radius * 2) {
      this.speed = this.radius * 2
    }
    this.angle += Math.random() / 5 - 1 / 5 / 2
    oldBranches.addX(this.x)
    oldBranches.addY(this.y)
    oldBranches.addR(this.radius)
    oldBranches.addCate("trunk")
  },
  /**
   * Generate a new branch
   */
  split: function() {
    let splitChance = 0
    if (this.generation === 1)
      splitChance = this.distance / window.innerHeight - 0.2
    else if (this.generation < 3)
      splitChance = this.distance / window.innerHeight - 0.1
    if (Math.random() < splitChance) {
      let n = 2 + Math.round(Math.random() * 3)
      for (var i = 0; i < n; i++) {
        let branch = new Branch()
        branch.x = this.x
        branch.y = this.y
        branch.angle = this.angle
        branch.radius = this.radius * 0.9
        branch.generation++
        branches.add(branch)
      }
      branches.remove(this)
    }
  },
  /**
   * End the growth of the tree
   */
  die: function() {
    if (this.radius < 0.5) {
      branches.remove(this)
    }
  }
}

/**
 * BranchCollection类
 * @constructor
 * @param {Object[]} branches An array of Branches.
 */
let BranchCollection = function() {
  this.branches = []
}
BranchCollection.prototype = {
  add: function(branch) {
    this.branches.push(branch)
  },
  process: function() {
    for (let b in this.branches) {
      this.branches[b].process()
    }
  },
  remove: function(branch) {
    for (let b in this.branches) {
      if (this.branches[b] === branch)
        this.branches.splice(b, 1)
    }
  }
}

/**
 * dieBranches类
 * @constructor
 * @param {number[]} oldBranchesX An array of the x-coordinates of the points of branches.
 * @param {number[]} oldBranchesY An array of the y-coordinates of the points of branches.
 * @param {number[]} oldBranchesR An array of the radius of the points of branches.
 * @param {number[]} oldBranchesLeafx An array of the x-coordinates of the points of leaves.
 * @param {number[]} oldBranchesLeafy An array of the y-coordinates of the points of leaves.
 */
let dieBranches = function () {
  this.oldBranchesX = []
  this.oldBranchesY = []
  this.oldBranchesR = []
  this.oldBranchesCategory = []
}
dieBranches.prototype = {
  addX: function (X) {
    this.oldBranchesX.push(X)
  },
  addY: function (Y) {
    this.oldBranchesY.push(Y)
  },
  addR: function (R) {
    this.oldBranchesR.push(R)
  },
  addCate: function (C) {
    this.oldBranchesCategory.push(C)
  },
  getBranches: function () {
    return this
  }
}

/**
 * Set width and window.innerHeight of canvas.
 * @function
 * @param  {int} w The width of canvas.
 * @param  {int} h The window.innerHeight of canvas.
 */
let createCanvas = function(w, h) {
  canvas1.width = w
  canvas1.height = h
  document.body.appendChild(canvas1)
  canvas2.width = w
  canvas2.height = h
  document.body.appendChild(canvas2)
  canvas3.width = w
  canvas3.height = h
  document.body.appendChild(canvas3)
  canvas4.width = w
  canvas4.height = h
  document.body.appendChild(canvas4)
  canvas5.width = w
  canvas5.height = h
  document.body.appendChild(canvas5)
  canvas6.width = w
  canvas6.height = h
  document.body.appendChild(canvas6)
  canvas7.width = w
  canvas7.height = h
  document.body.appendChild(canvas7)
}

/**
 * Initialize the first points.
 * @function
 * @param {number} n A number, which determines the number of circles.
 * @param {number} initialRadius A number, which detemines the radius of the first n circles.
 */
let initialBranch = function() {
  let n = 2 + Math.random() * 3
  let initialRadius = window.innerWidth / 50
  let branch = new Branch()
  for (let i = 0; i < n; i++) {
    branch.x = window.innerWidth / 2 - initialRadius + i * 2 * initialRadius / n
    branch.radius = initialRadius
    branches.add(branch)
  }
}

/**
 * Generate all points.
 * @function
 */
let pointsGenerator = function(isLoaded) {
  let promise = new Promise((resolve, reject) => {
    ctx4.fillStyle = "#1CDDB1"
    ctx4.font = "80px Governor"
    ctx4.textAlign = "center"
    ctx4.fillText("Tree Simulator", 0.5 * canvas4.width, 0.5 * canvas4.height)
    let timer = setInterval(function() {
      branches.process()
      loadingBar(oldBranches.oldBranchesX.length, 30000)
      console.log(oldBranches.oldBranchesX.length)
      if (branches.branches.length === 0) {
        clearInterval(timer)
        resolve()
      }
    }, 10)
  })
  promise.then(() => {
    isLoaded = true
    ctx4.fillStyle = "#000000"
    ctx4.strokeStyle = "#000000"
    ctx4.rect(0, window.innerHeight * 0.9, window.innerWidth, window.innerHeight * 0.02)
    ctx4.fill()
    ctx4.stroke()
    let hide = setTimeout(() => {
      enter.style.display = "inline"
      clearTimeout(hide)
    }, 500)
  })
}

/**
 * Draw the tree.
 * @function
 * @param {number} progress The number of points that have been painted.
 * @param {number} cnt The number of leaf points.
 */
function drawTree(progress, cnt) {
  let timer = setInterval(() => {
    if (progress > oldBranches.oldBranchesX.length) {
      drawPercent(1, 1)
      clearInterval(timer)
    }
    if (oldBranches.oldBranchesCategory[progress] === "trunk") {
      drawProgressbar(progress, oldBranches.oldBranchesX.length)
      drawPercent(progress, oldBranches.oldBranchesX.length)
      ctx1.globalAlpha = 0.5
      ctx1.fillStyle = "#946A2C"
      ctx1.beginPath()
      ctx1.moveTo(oldBranches.oldBranchesX[progress], oldBranches.oldBranchesY[progress])
      ctx1.arc(oldBranches.oldBranchesX[progress], oldBranches.oldBranchesY[progress], oldBranches.oldBranchesR[progress], 0, 2*Math.PI, true)
      ctx1.closePath()
      ctx1.fill()
    }
    if (oldBranches.oldBranchesCategory[progress] === "leaf") {
      drawProgressbar(progress, oldBranches.oldBranchesX.length)
      drawPercent(progress, oldBranches.oldBranchesX.length)
      if (cnt % 5 === 0 && cnt > 200) {
        let leaf = new Image()
        let p = Math.random() * 3
        let k = 0
        if (p < 1) {
          leaf.src = "../assets/leaf-1.png"
          k = 1
        } else if (p < 2) {
          oldBranches.oldBranchesX[progress] = oldBranches.oldBranchesX[progress] - 20
          leaf.src = "../assets/leaf-4.png"
          k = 2
        } else if (p < 3) {
          oldBranches.oldBranchesX[progress] = oldBranches.oldBranchesX[progress] - 10
          leaf.src = "../assets/leaf-1.png"
          k = 2
        }
        ctx2.globalAlpha = 0.7
        ctx2.drawImage(leaf, oldBranches.oldBranchesX[progress], oldBranches.oldBranchesY[progress], 10 * k, 10 * k)
      }
      cnt++
    }
    console.log(progress)
    progress = progress + 1
  }, 10)
}
