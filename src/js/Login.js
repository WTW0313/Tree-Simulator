$(function () {
    $("#btn").click(function () {
        $.post("../php/Login.php",{
            username:document.getElementById("username").value,
            password:document.getElementById("password").value
            },function (data) {
                if (data === "登录成功！") {
                    console.log(data);
                }else alert(data);
            }
            )
    })
})