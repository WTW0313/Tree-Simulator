<?php
include 'db.php';
$data_func = new database("127.0.0.1","root","lisongwei","myTree");
$data_func->register($_POST['username'],$_POST['password']);

?>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<form method="post" action="Register.php">
    username:<input type="text" name="username"><br>
    password:<input type="password" name="password"><br>
    <input type="submit" value="注册">
</form>
</body>
</html>