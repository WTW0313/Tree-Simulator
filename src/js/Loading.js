import {ctx4} from "./main"
/**
 * Draw the loadingbar.
 * @param  {number} loaded The points that have been loaded.
 */
export function loadingBar(loaded) {
  let p = loaded  / 30000
  ctx4.fillStyle = "#4FB39A"
  ctx4.strokeStyle = "#4FB39A"
  ctx4.rect(window.innerWidth * 0.1, window.innerHeight * 0.9, window.innerWidth * (0.1 + 0.8 * p) , window.innerHeight * 0.02)
  ctx4.fill()
  ctx4.stroke()
}