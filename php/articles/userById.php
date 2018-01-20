<?php
/**
 * Created by PhpStorm.
 * User: yg
 * Date: 2017/12/30
 * Time: 14:54
 */
header("Content-type:text/html;charset=utf-8");
$id=$_POST["id"];
$connect=mysqli_connect("127.0.0.1","root","root","albx");
mysqli_set_charset($connect,"utf8");
$sql= "SELECT * FROM users WHERE id = {$id}";
$res=mysqli_query($connect,$sql);
$arr=array();
while($row=mysqli_fetch_assoc($res)){
    $arr[]=$row;
}
$fan=array("code"=>200,"msg"=>"操作失败");
if(!empty($res)){
    $fan["code"]=100;
    $fan["msg"]="操作成功";
    $fan["data"]=$arr[0];
}
echo json_encode($fan,JSON_UNESCAPED_UNICODE);



?>