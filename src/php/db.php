<?php
/**
 * reate a database
 * @function
 * @param {String} $server_name "127.0.0.1"
 * @param {String} $db_username your MySQL username
 * @param {String} $db_password your MySQL password
 * @param {String} $database_name  the name of new database
 */
function create_database($server_name, $db_username, $db_password, $database_name) {
    try {
        $connect = new PDO("mysql:host=$server_name", $db_username, $db_password);
        $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "create database $database_name";
        $connect->exec($sql);
    } catch (PDOException $exception) {
        $error_file = fopen("error.txt","w");
        fwrite($error_file, "From create_database\n");
        fwrite($error_file, $exception->getMessage());
        fclose($error_file);
    }
};
/**
 * create a table
 * @function
 * @param {String} $server_name "127.0.0.1"
 * @param {String} $db_username your MySQL username
 * @param {String} $db_password your MySQL password
 * @param {String} $database_name  the name of new database
 * @param {String} $table_name  the name of new table
 */

function create_table($server_name,$db_username,$db_password,$database_name,$table_name) {
    try {
        $connect = new PDO("mysql:host=$server_name;dbname=$database_name",$db_username,$db_password);
        $connect->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

        $sql = "create table $table_name (
            id int(6) unsigned auto_increment primary key ,
            username varchar(30) not null ,
            password varchar(30) not null ,
            x_coordinate float(10) ,
            y_coordinate float(10) ,
            radius float(10) ,
            category tinyint(1)  
        )";
        $connect->exec($sql);
    }catch (PDOException $exception) {
        $error_file = fopen("error.txt","w");
        fwrite($error_file,"From create_table\n");
        fwrite($error_file,$exception->getMessage());
        fclose($error_file);
    }
}

/**
 * @param $server_name
 * @param $db_username
 * @param $db_password
 * @param $database_name
 * @param $table_name
 * @param {string} $register_username name of register
 * @param {string} $register_password password of register
 * @return string
 */

function insert_user($server_name,$db_username,$db_password,$database_name,$table_name,
$register_username,$register_password) {
    try {
        $connect = new PDO("mysql:host=$server_name;dbname=$database_name",$db_username,$db_password);
        $connect->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        $temp = "select * from $table_name where username = '$register_username'";
        $res = $connect->query($temp);
        foreach ($res as $row) {
            if ($row['username'] == $register_username) return "该用户名已被注册";
        }
        $sql = "insert into $table_name (username,password) 
        values ($register_username,$register_password)";
        $connect->exec($sql);
    }catch (PDOException $e) {
        $error_file = fopen("error.txt","w");
        fwrite($error_file,"From insert_table\n");
        fwrite($error_file,$e->getMessage());
        fclose($error_file);
    }
}

/**
 * check login and login
 * @param $server_name
 * @param $db_username
 * @param $db_password
 * @param $database_name
 * @param $table_name
 * @param $login_username {string}
 * @param $login_password {string}
 * @return string
 */
function login($server_name,$db_username,$db_password,$database_name,$table_name,
               $login_username,$login_password) {
    try {
        $connect = new PDO("mysql:host=$server_name;dbname=$database_name",$db_username,$db_password);
        $connect->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

        $sql = "select * from $table_name where username = $login_username";
        $res = $connect->query($sql);
        foreach ($res as $row) {
            if ($row['username'] == $login_username && $row['password'] == $login_password) {
                return "登录成功！";
            }else return "登录失败";
        }
    }catch (PDOException $e) {
        $error_file = fopen("error.txt","w");
        fwrite($error_file,"From login\n");
        fwrite($error_file,$e->getMessage());
        fclose($error_file);
    }
}
