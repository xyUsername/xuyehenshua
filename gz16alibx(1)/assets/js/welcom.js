$(function () {
    //请求服务端提供的获取网站统计数据的接口
    $.post("../php/welcom/getSiteData.php",function (res) {
        // console.log(res);
        if(res.code == 100){
            //把对应的数据填充到对应的标签的内容中
            $("#articleTotal").text(res.data.articleTotal);
            $("#articleDarfted").text(res.data.articleTotalCaoGao);
            $("#categoryTotal").text(res.data.categoryTotal);
            $("#commentTotal").text(res.data.commentsTotal);
            $("#commentHeld").text(res.data.commentsTotalHeld);
        }
    },"json");
});