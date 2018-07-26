import {ctx5, canvas5} from "./main"

/**
 * Display the percent of the progress of growth.
 * @param {number} grown The part of the tree that has grown.
 * @param {number} sum The summary of points.
 */
export function drawPercent(grown, sum) {
  canvas5.height = canvas5.height
  let per = Math.floor(grown * 100 / sum)
  let text = per.toString()
  if (text.length === 1) {
    text = "0" + text + "%"
  } else {
    text =　text + "%"
  }
  // ctx5.strokeStyle = "#2E68AA"
  ctx5.strokeStyle = "#FFFFFF"
  ctx5.font = "50px Verdana"
  ctx5.textAlign = "center"
  ctx5.strokeText(text,100,115)
}