<?php
include 'db.php';
$data_func = new database("127.0.0.1","root","lisongwei","myTree");
$data_func->login($_POST['username'],$_POST['password']);

