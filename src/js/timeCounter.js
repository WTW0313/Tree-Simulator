import {canvas6, ctx6} from "./main"

/**
 * Draw the time, which shows how long you have spent on this 'interesting' game.
 * @param  {number} time The time player has spent on this game.
 */
export function drawtimeCounter(time) {
  let day = 0
  let hour = 0
  let minute = 0
  let second = 0
  let text = "Time：" + day.toString() + "d " + hour.toString() + "h " + 
    minute.toString() + "m " + second.toString() + "s"
  ctx6.fillStyle = "#5E8579"
  ctx6.font = "20px Verdana"
  ctx6.textAlign = "left"
  ctx6.fillText(text, 0, canvas6.height - 10)
  let timecounter = setInterval(() => {
    time++
    if (time > 2592000) {
      clearTimeout(timecounter)
    }
    canvas6.height = canvas6.height
    day = Math.floor(time / 86400)
    hour = Math.floor((time % 86400) / 3600)
    minute = Math.floor(((time % 86400) % 3600) / 60)
    second = Math.floor(((time % 86400) % 3600) % 60)
    text = "Time：" + day.toString() + "d " + hour.toString() + "h " + 
      minute.toString() + "m " + second.toString() + "s"
    ctx6.fillStyle = "#5E8579"
    ctx6.font = "20px Verdana"
    ctx6.textAlign = "left"
    ctx6.fillText(text, 0, canvas6.height - 10)
  }, 1000)
}