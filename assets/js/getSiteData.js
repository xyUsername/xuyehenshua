checkLogin(true);//验证是否登录了；

$(function(){
  $.post("../php/articles/getSiteData.php", function (res) {
    if(res.code==100){
        $("#articleTotal").text(res.data.articleTotal);
        $("#articleDarfted").text(res.data.articleTotalCaoGao);
        $("#categoryTotal").text(res.data.categoryTotal);
        $("#commentTotal").text(res.data.commentsTotal);
        $("#commentHeld").text(res.data.commentsTotalHeld);
    }
  },"json")
});