import {ctx3} from "./main"

/**
 * Draw the life cirle.
 * @function
 */
export function drawCircle() {
  ctx3.strokeStyle = "#C2E38C"
  ctx3.lineWidth = 1
  ctx3.arc(100, 100, 80, 0, 2 * Math.PI)
  ctx3.stroke()
}

/**
 * Draw the Progressbar.
 * @function
 * @param  {number} progress The number of points that have been painted.
 * @param  {number} sum The summary of the points that have to be painted.
 */
export function drawProgressbar(progress, sum) {
  let p = 2 * progress * Math.PI / sum
  ctx3.beginPath()
  ctx3.fillStyle = "#76AC32"
  ctx3.moveTo(100, 100)
  ctx3.arc(100 - 80 * Math.cos(p), 100 - 80 * Math.sin(p), 4, 0, 2 * Math.PI)
  ctx3.closePath()
  ctx3.fill()
}
