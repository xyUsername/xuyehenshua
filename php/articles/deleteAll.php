<?php
/**
 * Created by PhpStorm.
 * User: yg
 * Date: 2017/12/30
 * Time: 15:43
 */
$ids=$_POST["ids"];
$sql="DELETE FROM articles WHERE id IN (". implode(",",$ids) .")";
$connect=mysqli_connect("127.0.0.1","root","root","albx");
mysqli_set_charset($connect,"utf8");
$res=mysqli_query($connect,$sql);
$arr=array("code"=>200,"msg"=>"操作失败");
if($res){
    $arr["code"]=100;
    $arr["msg"]="操作成功";
}
echo json_encode($arr,JSON_UNESCAPED_UNICODE);

?>