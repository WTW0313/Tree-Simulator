export {createCanvas}

/**
 * Set width and height of canvas.
 * @param  {int} w The width of canvas.
 * @param  {int} h The height of canvas.
 */
let createCanvas = function(w, h) {
  canvas.width = w
  canvas.height = h
  document.body.appendChild(canvas)
}
