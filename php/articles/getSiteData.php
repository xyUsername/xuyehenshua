<?php
/**
 * Created by PhpStorm.
 * User: yg
 * Date: 2017/12/31
 * Time: 15:17
 */

header("Content-type:text/html;charset=utf-8");
require_once "../DB_Util/sql_helper.php";
//写好的sql语句，可以获取前端页面想要的5个数据，这样做的好处是，只执行一条sql语句，可以提高数据库的存储效率
$sql = "SELECT * FROM (SELECT COUNT(*) AS articleTotal FROM articles) a join  (SELECT COUNT(*) AS articleTotalCaoGao FROM articles WHERE status=0) b JOIN (select count(*) as categoryTotal FROM categories c) c JOIN (SELECT COUNT(*) AS commentsTotal FROM comments c) d JOIN (SELECT COUNT(*) AS commentsTotalHeld from comments WHERE status=0) e";
$res=query($sql);
$arr=array("code"=>200,"msg"=>"操作失败");
if($res){
    $arr["code"]=100;
    $arr["msg"]="操作成功";
    $arr["data"]=$res[0];
}
echo json_encode($arr,JSON_UNESCAPED_UNICODE);

?>