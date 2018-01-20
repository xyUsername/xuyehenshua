$(function () {
    var pageCount = 10;
    //删除功能
    // 用户点击删除按钮，询问要不要删除，如果点击确认
    // 告诉服务端根据id删除
    $("#dataset").on("click",".del",function () {
        //询问
        // if(confirm("你确定要删除这条数据")){
        //     //根据id删除
        //     var id = $(this).parent().parent().attr("article_id");
        //     $.post("../php/articles/deleteArticleById.php",{id : id},function (res) {
        //         if(res.code == 100){
        //             alert(res.msg);
        //             //数据在服务端已经删除了，但是因为是异步操作，所以页面的数据是不会更新的
        //             // 1  在删除成功之后，刷新页面 -- 重新获取数据 -- 好处： 数据是最新的，每次都去服务器重新请求 --> 服务器和浏览器的交互过于频繁
        //             // 2  删除成功之后，手动的对这一行进行删除  -- 好处就是没有跟服务器进行交互 -- 数据不是最新的
        //             //  一般：如果是后台管理系统--少数人使用，采用第一种方式
        //             //  如果是面向大部分用户的 -- 比如淘宝，购物车的删除，建议采用手动删除节点的方式
        //
        //             location.reload();
        //         }else{
        //             alert(res.msg);
        //         }
        //     },"json");
        // }

        //因为回调函数里面的this是指向调用回调函数的对象的，需要提前保存起来
        var _that = this;

        //进化到layer。js的弹窗
        layer.confirm("请问您真的要删除这条数据吗？",{icon: 3, title : "您正在进行删除操作"},function (index) {
            //这个函数是在用户点击确定按钮的时候执行

            //如果有确定的回调函数，默认不会自己关闭弹窗，需要手动关闭
            layer.close(index);

            var id = $(_that).parent().parent().attr("article_id");
            //把id发送到服务端进行删除
            $.post("../php/articles/deleteArticleById.php",{id:id},function (res) {
                if(res.code == 100){
                    layer.alert(res.msg,{icon: 1},function () {
                        //该回调函数是在点击确定按钮的时候调用
                        location.reload();
                    })
                }else{
                    layer.alert(res.msg);
                }
            },"json");
        })
    });

    //批量删除
    // 全选和全不选操作
    // 点击全选和全不选
    $("thead input[type=checkbox]").on("click",function () {
        //控制别的多选框跟我的选中状态是一样的
        //找到别的多选框，设置其状态跟我的一致
        // 如果使用jq来操作元素的html属性 两个方法  attr  ||  prop
        // 一般使用attr来操作 标准属性和自定义属性 prop来操作开关属性
        var res = $(this).prop("checked");

        $("#dataset input[type=checkbox]").prop("checked",res);
        if(res){
            $("#del-mul").show();
        }else{
            $("#del-mul").hide();
        }
    });

    //给下面的多选框注册点击事件
    $("#dataset").on("click","input[type=checkbox]",function () {
        // console.log(123);
        //如果下面的多选框都选中了，上面的全选也要选中，否则全选不能选中
        // if($("#dataset input[type=checkbox]:checked").size() == pageCount){
        //     //如果选中的个数 跟 页面显示的属性一致 都选中了
        //     $("thead input[type=checkbox]").prop("checked",true);
        // }else{
        //     $("thead input[type=checkbox]").prop("checked",false);
        // }
        var count = $("#dataset input[type=checkbox]:checked").size();

        $("thead input[type=checkbox]").prop("checked",count == pageCount);
        //如果点选的下拉框超过两个，就显示批量删除
        if(count >= 2){
            $("#del-mul").show();
        }else{
            $("#del-mul").hide();
        }
    });

    //点击批量删除按钮
    $("#del-mul").on("click",function () {

        var ids = [];
        // 把选中的下拉框的数据的 文章id 以数组的形式发送回服务器
        // 1 先找到所有被选中的checkbox
        var cks = $("#dataset input[type=checkbox]:checked");
        // 2 遍历这些选中的checkbox，找到其对应的数据id
        cks.each(function (index,element) {
            var id = $(element).parent().parent().attr("article_id");
            // 3 把这些id放到一个数组里面
            ids.push(id);
        });

        // 4 把id数组发送到服务端
        $.post("../php/articles/deleteArticlesMutple.php",{ids: ids},function (res) {
            if(res.code == 100){
                layer.alert(res.msg,{icon : 1},function () {
                    location.reload();
                })
            }else{
                layer.alert(res.msg,{icon : 1},function (index) {
                    layer.close(index);
                })
            }
        },"json");
    });
});