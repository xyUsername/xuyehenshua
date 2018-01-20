$(function () {
    /**
     *  请求接口，把导航菜单的数据获取回来，生成结构
     *
     */

    $.post("../php/settings/getNavMenus.php",function (res) {
        if(res.code == 100){
            //把数据渲染到表格里面
            console.log(res.data);
            var html = $("#mt").tmpl(res.data);
            //添加到表格里面
            $("#dataset").empty().append(html);
        }
    },"json");

    /**
     *  删除逻辑
     *
     */
    $("#dataset").on("click",".del",function () {
        //删除之前是要确认的，自己做
        //获取id
        var id = $(this).attr("data-id");
        //发送请求到服务端进行删除
        $.post("../php/settings/deleteNavData.php",{id:id},function (res) {
            // console.log(res);
            if(res.code == 100){
                //提示用户，然后刷新
                location.reload();
            }
        },"json");
    });

    //新增的逻辑
    // 1 点击图标
    $("#choose-icon").on("click",function () {
        //显示一个图标的列表供用户选择
        // $(".icon-list").show();
        $(".icon-list").toggle();
    });

    // 点击图标列表修改图标的class
    $(".icon-list").on("click","span",function (e) {
        //获取点击的span的class
        var cls = $(this).attr("class");
        //设置给图标
        $("#choose-icon > span").attr("class",cls);
        //点完之后，把图标列表隐藏
        // $(".icon-list").hide();
        //阻止冒泡
        // e.stopPropagation();
        //把对应的class保存到隐藏域
        $("#icon").val(cls);
    });

    //点击保存
    $("#btn-sure").on("click",function () {
        var data = $("#nav-data").serialize();
        // console.log(data);
        //发现data里面的 icon 的格式是有问题的 需要把+ 替换成空格
        data = data.replace("+"," ");
        //把数据发送到后端
        $.post("../php/settings/addNavData.php",data,function (res) {
            if(res.code == 100){
                //提示用户，刷新页面
                location.reload();
            }
        },"json");
    })
});