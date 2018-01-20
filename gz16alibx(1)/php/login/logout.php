<?php
/* logout.php
 * create by : Invoker
 * created: 2017/12/30 11:31
 */

//清空对应的session
session_start();
unset($_SESSION["user_id"]);
// 返回结果
echo  json_encode(array(
    "code"=> 100,
    "msg"=> "登出成功"
),JSON_UNESCAPED_UNICODE);

?>
