<?php
/**
 * Created by PhpStorm.
 * User: yg
 * Date: 2017/12/30
 * Time: 8:26
 */
header("Content-type:text/html;charset=utf-8");
$id=$_POST["id"];
 $connect=mysqli_connect("127.0.0.1","root","root","albx");
 mysqli_set_charset($connect,"utf8");
$sql= "DELETE FROM articles WHERE id = {$id}";
$res=mysqli_query($connect,$sql);
$arr=array("code"=>200,"msg"=>"删除失败");
if($res){
    $arr["code"]=100;
    $arr["msg"]="删除成功";
}
echo json_encode($arr,JSON_UNESCAPED_UNICODE);


?>