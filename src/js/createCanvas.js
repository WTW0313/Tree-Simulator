export {createCanvas}

import {canvas, ctx} from "../js/main.js"

/**
 * Set width and height of canvas.
 * @function
 * @param  {int} w The width of canvas.
 * @param  {int} h The height of canvas.
 */
let createCanvas = function(w, h) {
  canvas.width = w
  canvas.height = h
  ctx.fillstyle = "#000000"
  ctx.strokeRect(0, 0, w, h)
  document.body.appendChild(canvas)
}
