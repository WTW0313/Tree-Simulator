import {Users} from "./Users"
$(function () {
    $("#login").click(function () {
        $.post("../php/Login.php",{
            username:document.getElementById("username").value,
            password:document.getElementById("password").value
            },function (data) {
                if (data === "登录成功！") {
                    const currentUser = new Users(document.getElementById("username").value,null);
                    // location.href = "Menu.html";
                }else alert(data);
            }
            )
    })

})

