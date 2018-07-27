import {ctx7, canvas7} from "./main"

/**
 * Draw the weather condition.
 * @function
 * @param {String} weather The present weather.
 */
export function weatherCondition(weather) {
  let p = 0
  ctx7.fillStyle = "#fdb933"
  ctx7.arc(canvas7.width - 100, 100, 80, 0, 2 * Math.PI)
  ctx7.fill()
  let condition = new Image()
  condition.src = "../assets/sunny.png"
  condition.onload = () => {
    ctx7.drawImage(condition, canvas7.width - 150, 50, 100, 100)
  }
  let weatherChange = setInterval(() => {
    canvas7.height = canvas7.height
    p = Math.random() * 3
    if (p < 1) {
      ctx7.fillStyle = "#fdb933"
      ctx7.arc(canvas7.width - 100, 100, 80, 0, 2 * Math.PI)
      ctx7.fill()
      condition.src = "../assets/sunny.png"
      condition.onload = () => {
        ctx7.drawImage(condition, canvas7.width - 150, 50, 100, 100)
      }
      weather = "sunny"
    } else if (p < 2) {
      ctx7.fillStyle = "#3D5363"
      ctx7.arc(canvas7.width - 100, 100, 80, 0, 2 * Math.PI)
      ctx7.fill()
      condition.src = "../assets/cloudy.png"
      condition.onload = () => {
        ctx7.drawImage(condition, canvas7.width - 160, 70, 120, 60)
      }
      weather = "cloudy"
    } else if (p < 3) {
      ctx7.fillStyle = "#1A4FA3"
      ctx7.arc(canvas7.width - 100, 100, 80, 0, 2 * Math.PI)
      ctx7.fill()
      condition.onload = () => {
        ctx7.drawImage(condition, canvas7.width - 150, 50, 100, 100)
      }
      condition.src = "../assets/rainy.png"
      weather = "rainy"
    }
  }, 60000)
}