checkLogin();
$(function () {


    /**
     * 介绍一个在浏览器端专门操作cookie的插件
     *      jquery.cookie.js
     *
     *      以前操作cookie，  document.cookie 是一个字符串
     *
     *      jquery.cookie.js操作器cookie就简单多了
     *
     *          存cookie
     *              $.cookie(键,值);
     *
     *          取
     *              $.cookie(键);
     *
     *          销毁cookie
     *              $.cookie(键,null);
     *
     *
     */

    /**
     *  如果要出现一条小的滚动条，其实不是index.html的滚动条，而是iframe的滚动条，只不过给index.html的body加了overflow:hidden; 让iframe的宽度刚好能把他的滚动撑出body的显示区域之外一点
     *      1  给index.html的body 加 overflow:hidden;
     *      2  让iframe的宽度变宽
     *
     *      3  当页面的宽度发生改变 - 获取能随着页面宽度修改而修改的元素的宽度，可能会经过计算设置给iframe
     *
     *
     *      处理高度的思路行不通
     *      4  处理高度  --  希望iframe的高度 跟页面的宽高差不多
     *      5  也尝试让  iframe的高度跟main的高度差不多
     *      6  如果像处理宽度一样，直接根据main的高度处理 iframe 的高度，如果是慢慢变大的没有问题
     *         但是如果是变小的就不行了
     *
     *      真正的处理高度的方式：
     *          使用浏览器的显示区域的高度来进行计算
     *              得到浏览器的显示区域的高度后 - nav的高度 - 一丢丢
     *                                              大约是65左右
     *
     */

    //直接设定iframe的宽度
    // $("#inner-frame").width(800);

    function resizeWindow() {
        var mw = $(".main").width();
        $("#inner-frame").width(mw);
        var wh = $(window).height();
        $("#inner-frame").height(wh - 65);
    }

    // $(window).on("resize",function () {
    //     resizeWindow();
    // });

    //处理iframe的宽高合理的方式
    $(window).on("resize",resizeWindow);
    resizeWindow();
    // window.onresize = function () {
    //     //获取能随着页面的宽度修改而修改的容器的宽度 -- main
    //     // var mw = $(".main").width();
    //     // // console.log(mw);
    //     // $("#inner-frame").width(mw);
    //     // //获取main的高度
    //     // // var mh = $(".main").height();
    //     // // console.log(mh);
    //     // // $("#inner-frame").height(mh);
    //     //
    //     // var wh = $(window).height();
    //     // // console.log(wh);
    //     // $("#inner-frame").height(wh - 65);
    // }


    /**
     *  点击左边的导航a标签的时候，让iframe的src指向我们想要展示的数据的页面
     *      给a标签注册点击事件，让iframe的src发生改变
     *      观察发现，需要点击的a标签，那些需要让iframe产生跳转的是没有兄弟元素的a标签
     *
     *      就在点击这些没有兄弟元素的a标签的是，获取该a标签的href属性，设置给iframe就可以了
     *
     */

    $(".aside a").on("click",function () {
        //排除那些不需要跳转的
        if($(this).siblings().size() == 0){
            // console.log(123);
            //获取自己的href
            var src = $(this).attr("href");
            //设置给iframe的src
            $("#inner-frame").attr("src",src);
            //还要组织a标签默认的跳转行为；
            return false;
        }
    });
//更新首页和头像；
    var user_id = $.cookie("user_id");
    //每个用户的名字和头像；
    $.post("php/articles/userById.php",{id :user_id}, function (res) {
        if(res.code==100){
            $(".name").text(res.data.nickname);
            $(".avatar").attr("src",res.data.avatar);
        }else{
            alert(res.msg);
        }
    },"json")

    //点击退出删除cookie数据；
    $("#logout").on("click", function () {
        //得到他的href
        var href=$(this).attr("href");
        //请求后台删除
        $.post("php/login/unset.php", function (res) {
            if(res.code==100){
                $.cookie("user_id",null);
                location.href=href;
            }else{
                alert(res.msg);
            }
        },"json")
        return false;
    })
});