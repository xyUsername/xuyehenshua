<?php
/* deleteNavData.php
 * create by : Invoker
 * created: 2017/12/31 10:18
 */
require_once "../DB_Util/sql_helper.php";
/**
 * 获取id
 */
$id = $_POST["id"];
//根据id删除
//1  先把所有的导航菜单数据查出来，
$sql = "SELECT o.value FROM options o WHERE o.`key` = 'nav_menus'";
$res = query($sql);
$json = $res[0]["value"];
$data = json_decode($json);

//2  根据id确认要删除的对象
// 遍历确认要删除的对象是哪一个
foreach ($data as $key => $val){
    //判断对应的对象的id是不是跟我们想要删除的id一直
    if($val->id == $id){
        //找到了 -- 从数组里移除
        array_splice($data,$key,1);
        break;
    }
}
//3  在更新到数据库里面
// 把data转换为json格式的字符串 -- 更新到表格里面
$json = json_encode($data,JSON_UNESCAPED_UNICODE);
//
$sql = "UPDATE options o SET o.value='{$json}' WHERE o.`key` = 'nav_menus'";
$res = execute($sql);

$arr = array("code"=>200,"msg"=>"操作失败");
if($res){
    $arr["code"] = 100;
    $arr["msg"] = "操作成功";
}

//把数据返回给前端
echo  json_encode($arr,JSON_UNESCAPED_UNICODE);

?>
