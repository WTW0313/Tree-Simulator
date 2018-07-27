import {canvas8, ctx8} from "./main"

export let clearColor = "rgba(255, 255, 255, .1)"
export let max = 50
export let drops = []
export let Animation

/**
 * Generates a random number for the specified range
 * @function
 * @param  {number} min
 * @param  {number} max
 */
export function random(min, max) {
  return Math.random() * (max - min) + min
}

/**
 * @constructor
 */
export function RainDrop(){}
RainDrop.prototype = {
  init:function(){
    this.x =  random(0, canvas8.width)
    this.y = 0
    this.color = "hsl(180, 100%, 50%)"
    this.vy = random(9, 10)
    this.hit = random(canvas8.height * .8, canvas8.height)
    this.size = 2
  },
  draw:function(){
    if (this.y < this.hit) {
      ctx8.fillStyle = this.color
      ctx8.fillRect(this.x, this.y, this.size, this.size * 5)
    }
    this.update()
  },
  update:function(){
    if(this.y < this.hit){
      this.y += this.vy
    }else{
      this.init()
    }
  }
}

/**
 * @function
 */
export function setup(){
  for(let i = 0; i < max; i++){
    (function(j){
      setTimeout(function(){
        let o = new RainDrop()
        o.init()
        drops.push(o)
      }, j * 200)
    }(i))
  }
}

/**
 * @function
 */
export function anim() {
  ctx8.fillStyle = clearColor
  ctx8.fillRect(0, 0, canvas8.width, canvas8.height)
  for(let i in drops){
    drops[i].draw()
  }
  Animation = requestAnimationFrame(anim)
}

/**
 * @function
 */
export function rain() {
  setup()
  anim()
}