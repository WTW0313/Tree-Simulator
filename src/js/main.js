import {createCanvas} from "./canvas.js"
window.addEventListener("load", main)
let canvas = document.createElement("canvas")
let ctx = canvas.getContext("2d")
ctx.shadowBlur = 2

/**
 * Executive function
 */
function main() {
  createCanvas(window.innerWidth, window.innerHeight)
}