import {ctx7, canvas7} from "./main"

/**
 * Draw the weather condition.
 * @function
 * @param {String} weather The present weather.
 */
export function weatherCondition(weather) {
  let p = 0
  let w = new Image()
  w.src = "../assets/leaf-1.png"
  ctx7.drawImage(w, canvas7.width * 0.5, canvas7.height * 0.5)
  let weatherChange = setInterval(() => {
    p = Math.random() * 3
    if (p < 1) {
      w.src = "../assets/sunny.png"
      weather = "sunny"
    } else if (p < 2) {
      w.src = "../assets/cloudy.png"
      weather = "cloudy"
    } else if (p < 3) {
      w.src = "../assets/rainy.png"
      weather = "rainy"
    }
    ctx7.drawImage(w, canvas7.width * 0.5, 80)
  }, 120000)
}