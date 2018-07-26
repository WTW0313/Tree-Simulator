<?php
class database {
    var $server_name;
    var $user_name;
    var $password;
    var $database_name;
    var $table_name = "users";
    var $current = "currentUser";
    var $User;
    var $tree_message;//关联数组

    /** 函数构造器 输入数据库相关参数
     * database constructor.
     * @param $servername
     * @param $username
     * @param $psd
     * @param $dbname
     */
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

    /**
     * 存储当前登录的用户
     */
    function current_user() {
        try {
            $conn = $this->connect_database();
            $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

            $sql = "create table $this->current (
                id int (6) unsigned auto_increment primary key ,
                username varchar (30) not null 
            )";
            $conn->exec($sql);
        }catch (PDOException $e) {
            echo "current_user" . "<br>" . $e->getMessage();
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
                category varchar (100) ,
                progress int (100),
                cnt int (100),
                time varchar (30)
            )";
            $conn->exec($sql);
        }catch (PDOException $e) {
            echo "create table" . "<br>" . $e->getMessage();
        }
    }

    /**
     * @param $uname    登录、注册时用户名和密码
     * @param $pswd
     * @return string 用户已存在或者注册成功
     */
    function register($uname,$pswd) {
        try {
            $conn = $this->connect_database();
            $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            if ($uname == "" || $pswd == "") {
                echo "用户名或密码不能为空";
                return;
            }
            $user_list = "select * from $this->table_name";
            $res = $conn->query($user_list);
            foreach ($res as $row) {
                if ($row['username'] == $uname) {
                    echo "用户已存在！";
                    return;
                }
            }
            $sql = "insert into $this->table_name (username,password) 
        values ('$uname','$pswd')";
            $conn->exec($sql);
            echo "注册成功！";
            return ;
        }catch (PDOException $e) {
            echo "register" . "<br>" . $e->getMessage();
        }
    }

    /**
     * @param $uname
     * @param $pswd
     * @return string 用户不存在     登录成功      密码错误
     */
    function login($uname,$pswd) {
        try {
            $conn = $this->connect_database();
            $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            $user_list = "select * from $this->table_name where username = '$uname'";
            $res = $conn->query($user_list);
            if ($uname == "" && $pswd == ""){
                return "账户或密码不能为空";
            };
            foreach ($res as $row) {
                if ($row['password'] == $pswd) {
                    return "登录成功！";
                }
                else {
                    return "密码错误";
                }
            }
            return "用户不存在";
        }catch (PDOException $e) {
            echo "login" . "<br>" .$e->getMessage();
        }
    }

    /**当前登录用户存入数据库
     * @param $uname
     */
    function login_user($uname) {
        try {
            $conn = $this->connect_database();
            $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
//            $mes = "select * from $this->current";
//            $res = $conn->query($mes);
//            echo $res;

            $sth = $conn->prepare("select * from $this->current");
            $sth->execute();
            $res = $sth->fetchAll();
            if ($res == null) {
                $ins = "insert into $this->current (username) values ('$uname')";
                $conn->exec($ins);
            }else {
                $sql = "update $this->current set username = '$uname' where id = 1";
                $conn->exec($sql);
            }

        }catch (PDOException $e) {
            echo "login_user" . "<br>" . $e->getMessage();
        }
    }

    /**获得当前用户
     * @return string
     */
    function get_login_user() {
        try {
            $conn = $this->connect_database();
            $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

            $sql = "select * from $this->current";
            $res = $conn->query($sql);
            if ($res) {
                foreach ($res as $row) {
                    $this->User = $row['username'];
                }
                return $this->User;
            } else return "当前未登录";
        }catch (PDOException $e) {
            echo "get_login_user" . "<br>" . $e->getMessage();
        }
    }

    /**
     * 登出
     */
    function logout_user() {
        try {
            $conn = $this->connect_database();
            $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

            $sql = "truncate $this->current";
            $conn->exec($sql);
        }catch (PDOException $e) {
            echo "logout_user" . "<br>" . $e->getMessage();
        }
    }

    /**将数据储存到数据库
     * @param $uname 用户名
     * @param $x    树的四个参数所属文件的路径
     * @param $y
     * @param $r
     * @param $c
     */
    function set_tree_message ($uname,$x,$y,$r,$c,$p,$cnt,$t) {
        try {
            $conn = $this->connect_database();
            $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            $find = "select * from $this->table_name where username = '$uname'";
            $res = $conn->query($find);
            $sql = "insert into $this->table_name (x_coordinate,y_coordinate,radius,category,progress,cnt,time)
        values ('$x','$y','$r','$c','$p','$cnt','$t')";
            $update = "replace into $this->table_name (x_coordinate,y_coordinate,radius,category)
        values ('$x','$y','$r','$c','$p','$cnt','$t')";
            foreach ($res as $row) {
                if ($row['username'] == $uname) {
                    if ($row[x_coordinate] != null) {
                        $conn->exec($update);
                    }else {
                        $conn->exec($sql);
                    }
                }
            }
        }catch (PDOException $e) {
            echo "setTreeMessage" . "<br>" . $e->getMessage();
        }
    }

    /**根据用户名从数据库获得树的参数的文件的路径；
     * @param $uname
     */
    function get_tree_message($uname) {
        try {
            $conn = $this->connect_database();
            $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

            $sql = "select * from $this->table_name where username = '$uname'";
            $res = $conn->query($sql);
            foreach ($res as $row) {
                if ($row['username'] == $uname) {
                    $this->tree_message = array("x"=>$row['x_coordinate'],"y"=>$row['y_coordinate'],
                        "r"=>$row['radius'],"c"=>['category'],"p"=>['progress'],
                        "cnt"=>['cnt'],"t"=>['time']);
                }
            }
        }catch (PDOException $e) {
            echo "getTreeMessage" . "<br>" . $e->getMessage();
        }
    }
}
?>
