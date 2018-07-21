export {createCanvas};

/**
 * Set width and height of canvas.
 * @param  {int} w The width of canvas.
 * @param  {int} h The height of canvas.
 */
let createCanvas = function(w, h) {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = w;
  canvas.height = h;
  document.body.appendChild(canvas);
};
