<?php
/* deleteArticleById.php
 * create by : Invoker
 * created: 2017/12/30 9:17
 */

require_once "../DB_Util/sql_helper.php";

//先得到用户冲浏览器端返回的id
$id = $_POST["id"];
//$sql = "DELETE FROM articles WHERE id = {$id}";
//
//$connect = mysqli_connect("127.0.0.1","root","root","gz16alibx");
//mysqli_set_charset($connect,"utf8");
//$res = mysqli_query($connect,$sql);
//调用封装好的方法删除数据
$res = deleteById("articles",$id);

$arr = array("code"=>200,"msg"=>"操作失败");
if($res){
    $arr["code"] = 100;
    $arr["msg"] = "操作成功";
}

//把数据返回给前端
echo  json_encode($arr,JSON_UNESCAPED_UNICODE);

?>
