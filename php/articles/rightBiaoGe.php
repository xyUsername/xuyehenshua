<?php
/**
 * Created by PhpStorm.
 * User: yg
 * Date: 2017/12/31
 * Time: 16:19
 */
require_once "../DB_Util/sql_helper.php";
//查询表格；
$sql = "SELECT o.value FROM options o WHERE o.`key` = 'nav_menus'";
$res = query($sql);
$arr=array("code"=>200,"msg"=>"操作失败");
$value = $res[0]["value"];//此时是字符串如果直接返回前端，前端在json解析的时候，会还原会其原来的形式
//需要把字符串先解析成对象或者数组，在前端反过来解析的时候才能也是数组或者字符串
$data=json_decode($value);
if($res){
    $arr["code"]=100;
    $arr["msg"]="操作成功";
    $arr["data"]=$data;
}

echo json_encode($arr,JSON_UNESCAPED_UNICODE);
?>