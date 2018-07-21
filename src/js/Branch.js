export {Branch}
/**
 * Branch类
 * @constructs
 * @param {float} x x-coordinate
 * @param {float} y y-coordinate
 * @param {float} radius The radius of a point
 * @param {float} angle The angle of deflection
 * @param {float} speed The speed of growth
 * @param {int} generation The generation of the branch
 * @param {float} distance The distance of a new point and an old point 
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
  draw: function() {
    ctx.fillStyle = "#946A2C"
    ctx.shadowcolor = "#000000"
    ctx.shadowBlur = 2
    cts.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true)
    ctx.closePath()
    ctx.fill()
  },
  drawPoints: function() {

  }
}