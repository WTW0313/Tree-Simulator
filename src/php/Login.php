<?php
include 'db.php';
$data_func = new database("127.0.0.1","root","lisongwei","myTree");
if ($data_func->login($_POST['username'],$_POST['password']) == "登录成功！") {
    echo $data_func->login($_POST['username'],$_POST['password']);
    $data_func->login_user($_POST['username']);
}else {
    echo $data_func->login($_POST['username'],$_POST['password']);
}


