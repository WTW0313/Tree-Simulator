<?php
class database {
    var $server_name;
    var $user_name;
    var $password;
    var $database_name;
    var $table_name;
    function __construct($servername,$username,$psd,$dbname) {
        $this->server_name = $servername;
        $this->user_name = $username;
        $this->password = $psd;
        $this->database_name = $dbname;
    }
    function new_database () {
        return new PDO("mysql:host=$this->server_name",$this->user_name,$this->password);
    }
    function connect_database () {
        return new PDO("mysql:host=$this->server_name;dbname=$this->database_name",$this->user_name,$this->password);
    }


    function create_database() {
        try {
            $conn = $this->new_database();
            $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

            $sql = "create database $this->database_name";
            $conn->exec($sql);
        }catch (PDOException $e) {
            echo "create_database" . "<br>" . $e->getMessage();
        }
    }

    function create_table() {
        try {
            $conn = $this->connect_database();
            $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

            $sql = "create table $this->table_name (
                id int (6) unsigned auto_increment primary key ,
                username varchar (30) not null ,
                password varchar (30) not null ,
                x_coordinate varchar (100) ,
                y_coordinate varchar (100) ,
                radius varchar (100) ,
                category varchar (100)
            )";
            $conn->exec($sql);
        }catch (PDOException $e) {
            echo "create table" . "<br>" . $e->getMessage();
        }
    }

    function register($uname,$pswd) {
        try {
            $conn = $this->connect_database();
            $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

            $user_list = "select * from $this->table_name";
            $res = $conn->query($user_list);
            foreach ($res as $row) {
                if ($row['username'] == $uname) return "该用户已存在";
            }
            $sql = "insert into $this->table_name (username,password) 
        values ($uname,$pswd)";
            $conn->exec($sql);
        }catch (PDOException $e) {
            echo "register" . "<br>" . $e->getMessage();
        }
    }

    function login($uname,$pswd) {
        try {
            $conn = $this->connect_database();
            $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

            $user_list = "select * from $this->table_name where username = '$uname'";
            $res = $conn->query($user_list);
            if ($res == null) return "用户不存在！";
            foreach ($res as $row) {
                if ($row['password'] == $pswd) return "登录成功！";
                else return "密码错误";
            }
        }catch (PDOException $e) {
            echo "login" . "<br>" .$e->getMessage();
        }
    }

    function get_tree_message ($uname,$pswd,$x,$y,$r,$c) {
        $conn = $this->connect_database();
        $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

        $sql
    }
}
