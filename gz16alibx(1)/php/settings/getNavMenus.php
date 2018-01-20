<?php
/* getNavMenus.php
 * create by : Invoker
 * created: 2017/12/31 9:33
 */
require_once "../DB_Util/sql_helper.php";
/**
 *  要查询的表格是 options表
 *      要获取的数据是  key为 nav_menus'
 *      对应的值       value字段
 *
 */

$sql = "SELECT o.value FROM options o WHERE o.`key` = 'nav_menus'";
$res = query($sql);

//echo "<pre>";
//print_r($res);
//echo "</pre>";

$arr = array("code"=>200,"msg"=>"操作失败");

$value = $res[0]["value"];//此时是字符串如果直接返回前端，前端在json解析的时候，会还原会其原来的形式
//需要把字符串先解析成对象或者数组，在前端反过来解析的时候才能也是数组或者字符串
$data = json_decode($value);
if($res){
    $arr["code"] = 100;
    $arr["msg"] = "操作成功";
//    $arr["data"] = $res[0]["value"];
    $arr["data"] = $data;
}

//把数据返回给前端
echo  json_encode($arr,JSON_UNESCAPED_UNICODE);
?>
