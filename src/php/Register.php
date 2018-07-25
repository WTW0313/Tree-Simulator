<?php
include 'db.php';
$data_func = new database("127.0.0.1","root","lisongwei","myTree");
$data_func->register($_POST['username'],$_POST['password']);
?>
