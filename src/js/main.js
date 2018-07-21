import {createCanvas} from "./canvas.js"
window.addEventListener("load", main)
let canvas = document.createElement("canvas")
let ctx = canvas.getContext("2d")

/**
 * Executive function
 */
function main() {
  createCanvas(window.innerWidth, window.innerHeight)
}