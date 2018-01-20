checkLogin(true);
$(function(){
  //点击图标，一大堆的图标显示；
    $("#choose-icon").on("click", function () {
        $(".icon-list").show();
    });
    $(".icon-list").on("click","span", function (e) {//给它的后代的span注册事件；
        var cls=$(this).attr("class");
        $("#choose-icon >span").attr("class",cls);//是span的class改变成对应的；
        $(".icon-list").hide();
        $("#icon").val(cls);//因为需要用提交把value值带去后台，所以这里做了个隐藏域，把它的值存起来了；
        e.stopPropagation();//阻止事件冒泡；
    });

    //向后台请求数据，渲染右边的表格；
    $.post("../php/articles/rightBiaoGe.php", function (res) {
        if(res.code==100){
            //把内容加进去；
            var html=$("#mt").tmpl(res.data);
            // console.log(res.data);
            $("#dataset").html(html);
            // $("#dataset").empty().append(html);或者写成这样的；
        }
    },"json");

    //点击删除，根据id删除；
    $("#dataset").on("click",".del", function () {
        layer.confirm("您确定要删除吗?",{icon :3}, function (index) {
            layer.close(index);//关闭
            var id = $(".text-center a").attr("data-id");//获取对应的id；
            $.post("../php/articles/deleteRight.php",{id:id}, function (res) {
                if(res.code==100){
                    layer.alert(res.msg,{icon :1}, function () {
                        location.reload();
                    })
                }else{
                    layer.alert(res.msg,{icon:2})
                }
            },"json");
        })
    })

    //点击保存，把数据保存到表格里；
    $("#btn-sure").on("click", function () {
        //获取表单里的元素；
        var data=$("#nav-data").serialize();
        //发现data里面的 icon 的格式是有问题的 需要把+ 替换成空格
        data = data.replace("+"," ");//把字符串里的"+"替换成" " 空格；才满足格式；
        $.post("../php/articles/leftBc.php",data, function (res) {
            if(res.code==100){
                location.reload();
            }
        },"json")
    })


});