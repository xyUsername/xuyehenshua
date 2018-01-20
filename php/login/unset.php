<?php
/**
 * Created by PhpStorm.
 * User: yg
 * Date: 2017/12/30
 * Time: 15:33
 */
session_start();
unset($_SESSION["user_id"]);
echo json_encode(array(
    "code"=>100,
    "msg"=>"操作成"
),JSON_UNESCAPED_UNICODE);
?>