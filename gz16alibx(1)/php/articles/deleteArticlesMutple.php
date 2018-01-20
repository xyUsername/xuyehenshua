<?php
/* deleteArticlesMutple.php
 * create by : Invoker
 * created: 2017/12/30 10:32
 */

require_once "../DB_Util/sql_helper.php";

// ids 就是我们从前端传递回来的选中的tr的id
$ids = $_POST["ids"];
//删除这些id对应的数据
//删除多个数据 ， 1  可以循环的删除 -- 这个用法不推荐，效率低下
// 2  批量删除的写法
//  IN 语法

// where 键  in  ( 值,值,值,值 )
/**
 * --  根据多个id查找数据

    SELECT * FROM articles a WHERE a.id IN (5,9,12,118,1000)

--  DELETE FROM articles WHERE id IN (5,9,12,118,1000)
 */

//  需要的sql语句   DELETE FROM articles WHERE id IN (值,值,值)
//  需要从 ids 中把值拼接成  以  逗号隔开的形式
//echo implode(",",$ids);
$sql = "DELETE FROM articles WHERE id IN (". implode(",",$ids) .")";

//$res = query($sql);
//$connect = connect();
//$res = mysqli_query($connect,$sql);
$res = execute($sql);

$arr = array("code"=>200,"msg"=>"操作失败");
if($res){
    $arr["code"] = 100;
    $arr["msg"] = "操作成功";
}

//把数据返回给前端
echo  json_encode($arr,JSON_UNESCAPED_UNICODE);

?>
