$(function () {
  $("*").load(function () {
    $.post("../php/Menu.php",{
      type:"getUser"
    },function (data) {
      document.getElementById("currentUser").innerHTML = data
    });
    $.post("../php/Menu.php",{
      type:"getTree"
    },function (data) {
      if (!data) {
        document.getElementById("getNew").style.display = "inherit"
      }else document.getElementById("getOld").style.display = "inherit"
    })
  })
  $("#getNew").click(function () {
    let n = 0
    document.getElementById("progress").style.display = "inherit"
    /**
     * @function
     * @param  {number} x
     */
    function changeProgress(x) {
      document.getElementById("active").style.width = x + "%"
      n += 1
    }
    let increase = setInterval(function () {
      changeProgress(n)
      if (n === 101) {
        clearInterval(increase)
        location.href = "../../index.php"
      }
    },30)
  })
  $("#getOld").click(function () {
    let n = 0
    document.getElementById("progress").style.display = "inherit"
    /**
     * @function
     * @param  {number} x
     */
    function changeProgress(x) {
      document.getElementById("active").style.width = x + "%"
      n += 1
    }
    let increase = setInterval(function () {
      changeProgress(n)
      if (n === 101) {
        clearInterval(increase);
        location.href = "../../index.php"
      }
    },30)
  })
})