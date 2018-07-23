export {Branch}
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
function Branch() {
  this.x = canvas.width / 2
  this.y = canvas.height / 2
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
    this.draw()
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
    cts.beginPath()
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
    ctx.fillStyle = "#83AD50"
    ctx.shadowColor = "#83AD50"
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.arc(this.x + 10 * p * Math.cos(theta * p), this.y - 10 * p * Math.sin(theta * p), 4, 0, 2 * Math.PI, true)
    ctx.closePath()
    ctx.fill()
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
  },
  /**
   * Generate a new branch
   */
  split: function() {
    let splitChance = 0
    if (this.generation === 1)
      splitChance = this.distance / height - 0.2
    else if (this.generation < 3)
      splitChance = this.distance / height - 0.1
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