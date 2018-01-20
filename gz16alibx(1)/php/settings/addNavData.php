<?php
/* addNavData.php
 * create by : Invoker
 * created: 2017/12/31 10:52
 */

require_once "../DB_Util/sql_helper.php";

//echo "<pre>";
//print_r($_POST);
//echo "</pre>";
//如果要把数据添加到表格里面，其实是把从前端获取的数据变成json格式字符串中的一部分
// 又要获取原来的数据 + 把新数据添加到旧数据的后面 + 更新回数据库
$sql = "SELECT o.value FROM options o WHERE o.`key` = 'nav_menus'";
$res = query($sql);
$json = $res[0]["value"];
$data = json_decode($json);
// 新数据此时还缺一个id， 现在的做法是把最大的id存储到 表格里面，每次新增从里面获取，并把最大id+1
$sqlMaxId = "SELECT o.value FROM options o WHERE o.`key` = 'max_nav_id'";
$maxId = query($sqlMaxId);
$maxId = $maxId[0]["value"];
//让最大id+1作为新数据的id
$_POST["id"] = $maxId + 1;

//把新数据添加到旧数据的后面
array_push($data,$_POST);
//把新数据更新到数据库
$json = json_encode($data,JSON_UNESCAPED_UNICODE);
$sqlUpdate = "UPDATE options o SET o.value='{$json}' WHERE o.`key` = 'nav_menus'";
$res = execute($sqlUpdate);

$arr = array("code"=>200,"msg"=>"操作失败");

//如果新数据已经同步到表格里面了，必须把最大id也更新一下
if($res){
    //继续更新最大id
    $maxId++;
    $sqlUpdateMaxId = "UPDATE options o SET o.value='{$maxId}' WHERE o.`key` = 'max_nav_id'";
    $updateRes = execute($sqlUpdateMaxId);
    //如果这个仍然成立，才是全部成立

    if($updateRes){
        $arr["code"] = 100;
        $arr["msg"] = "操作成功";
    }

//把数据返回给前端

}
echo  json_encode($arr,JSON_UNESCAPED_UNICODE);

?>
