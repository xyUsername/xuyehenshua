<?php
/* sql_helper.php
 * create by : Invoker
 * created: 2017/12/25 11:25
 */

//因为每次操作数据库都要连接，所有干脆也封装起来
function connect(){
    $connect = mysqli_connect("127.0.0.1","root","root");
    // 2 选择数据库
    mysqli_select_db($connect,"gz16alibx");
    // 3  有必要的时候设置一下编码 -- 一般都会设置
    mysqli_set_charset($connect,"utf8");

    return $connect;
}

/**
 * 封装一个用于查询的方法
 *
 */
function query($sql){
    // 1 连接服务
//    $connect = mysqli_connect("127.0.0.1","root","root");
//    // 2 选择数据库
//    mysqli_select_db($connect,"gz16alibx");
//    // 3  有必要的时候设置一下编码 -- 一般都会设置
//    mysqli_set_charset($connect,"utf8");
    // 4  准备操作数据库得到sql语句
   // $sql = "SELECT * FROM users WHERE email = '{$email}'";
    $connect = connect();
    // 5  执行sql代码并接受结果
    $res = mysqli_query($connect,$sql);

    //得到查询结果之后，看看里面有没有数据 -- 一般会把结果集转换为二位数组
    $arr = array();
    //循环取出结果集里面的每行数据 - 以关联数组的形式返回
    while ($row = mysqli_fetch_assoc($res)){
        $arr[] = $row;
    }
    //要把查询的结果以二维数组的形式返回
    return $arr;
}

//封装插入操作的函数
function insert($arr,$table){
    $keys = array_keys($arr);
    $values = array_values($arr);

    $sql = "INSERT INTO {$table} (" . implode(",",$keys) . ") values('" . implode("','",$values) . "')";
//如果要操作数据库，又要5步
    $connect = connect();
    $res = mysqli_query($connect,$sql);

    return $res;
}


function update($table,$arr,$id){
    $connect = connect();
    $sql = "UPDATE {$table} SET ";
    foreach ($arr as $key => $value){
        $sql .= $key."='".$value."',";
    }
//此时还多了一个逗号
    $sql = substr($sql,0,-1);
//拼接要修改的条件
    $sql .= " where id={$id}";
    //执行sql语句
    $res = mysqli_query($connect,$sql);
    return $res;
}

function deleteById($table,$id){
    $sql = "DELETE FROM {$table} WHERE id = {$id}";

//    $connect = mysqli_connect("127.0.0.1","root","root","gz16alibx");
//    mysqli_set_charset($connect,"utf8");
    $connect = connect();
    $res = mysqli_query($connect,$sql);
    return $res;
}
//封装好的只执行sql语句的方法
function execute($sql){
    $connect = connect();
    $res = mysqli_query($connect,$sql);
    return $res;
}


?>
