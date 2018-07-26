import {ctx4} from "./main"
/**
 * Draw the loadingbar.
 * @param  {number} loaded The points that have been loaded.
 */
export function loadingBar(loaded, sum) {
  let p1 = (loaded - 1) / sum
  let p2 = loaded / sum
  ctx4.fillStyle = "#4FB39A"
  ctx4.strokeStyle = "#4FB39A"
  ctx4.rect(window.innerWidth * p1, window.innerHeight * 0.9, window.innerWidth * p2, window.innerHeight * 0.02)
  ctx4.fill()
  ctx4.stroke()
}