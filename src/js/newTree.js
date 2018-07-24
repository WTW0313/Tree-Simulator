import {canvas, ctx, branches, oldBranches} from "./main"

export {Branch, BranchCollection, dieBranches, createCanvas, initialBranch, pointsGenerator}

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
  this.x = canvas.width / 2
  this.y = canvas.height
  this.radius = 10
  this.angle = Math.PI / 2
  this.speed = canvas.width / 500
  this.generation = 0
  this.distance = 0
}
Branch.prototype = {
  /**
   * Main painting function
   */
  process: function() {
    // this.draw()
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
    ctx.fillStyle = "#946A2C"
    ctx.shadowcolor = "#946A2C"
    ctx.shadowBlur = 2
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true)
    ctx.closePath()
    ctx.fill()
  },
  /**
   * Draw a leaf point and record the point
   */
  drawPoints: function() {
    let p = Math.random()
    let theta = Math.PI / 2
    oldBranches.addX(this.x + 10 * p * Math.cos(theta * p))
    oldBranches.addY(this.y - 10 * p * Math.sin(theta * p))
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
      splitChance = this.distance / window.screen.height - 0.2
    else if (this.generation < 3)
      splitChance = this.distance / window.screen.height - 0.1
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
 * Set width and window.screen.height of canvas.
 * @function
 * @param  {int} w The width of canvas.
 * @param  {int} h The window.screen.height of canvas.
 */
let createCanvas = function(w, h) {
  canvas.width = w
  canvas.height = h
  ctx.fillstyle = "#000000"
  ctx.strokeRect(0, 0, w, h)
  document.body.appendChild(canvas)
}

/**
 * Initialize the first points.
 * @function
 * @param {number} n A number, which determines the number of circles.
 * @param {number} initialRadius A number, which detemines the radius of the first n circles.
 */
let initialBranch = function() {
  let n = 2 + Math.random() * 3
  let initialRadius = window.screen.width / 50
  let branch = new Branch()
  for (let i = 0; i < n; i++) {
    branch.x = window.screen.width / 2 - initialRadius + i * 2 * initialRadius / n
    branch.radius = initialRadius
    branches.add(branch)
  }
}

/**
 * Generate all points.
 * @function
 */
let pointsGenerator = function() {
  let timer = setInterval(function() {
    branches.process()
    console.log(oldBranches.oldBranchesX.length)
    if (branches.branches.length === 0) {
      clearInterval(timer)
    }
  }, 20)
}
