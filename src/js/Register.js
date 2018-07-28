$(function () {
  $("#btn").click(function () {
    $.post("../php/Register.php",{
      username:document.getElementById("username").value,
      password:document.getElementById("password").value
    },function (data) {
      if (data === "注册成功！") {
        location.href = "Login.html"
      }else {
        alert(data)
      }
    })
  })
})