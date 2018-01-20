<?php
/* getUserById.php
 * create by : Invoker
 * created: 2017/12/30 11:08
 */

require_once "../DB_Util/sql_helper.php";

//先从前端把id获取
$id = $_POST["id"];
$sql = "SELECT * FROM users u WHERE id = {$id}";
//调用函数差选
$res = query($sql);

$arr = array("code"=>200,"msg"=>"操作失败");
if($res){
    $arr["code"] = 100;
    $arr["msg"] = "操作成功";
    $arr["data"] = $res[0];
    //  如果为了安全考虑 -- 邮箱和密码也在 * 里面 ，可以只返回头像和昵称
}

//把数据返回给前端
echo  json_encode($arr,JSON_UNESCAPED_UNICODE);
?>
