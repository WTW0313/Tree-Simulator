let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");

/**
 * Set width and height of canvas.
 * @param  {int} w The width of canvas.
 * @param  {int} h The height of canvas.
 */
function createCanvas(w, h) {
  canvas.width = w;
  canvas.height = h;
}
