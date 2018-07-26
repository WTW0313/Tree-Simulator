<?php
include 'db.php';
$data_func = new database("127.0.0.1","root","lisongwei","myTree");
if ($_POST['type'] == "getUser") {
    echo $data_func->get_login_user();
}else if ($_POST['type'] == "getTree") {
    echo $data_func->tree_message;
}