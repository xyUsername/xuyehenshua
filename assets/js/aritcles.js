checkLogin(true);

$(function () {
    //页面一开始加载完毕之后，把数据从服务端获取回来，展示在页面上
    // $.post("../php/articles/getArticlesAll.php",function (res) {
    //     // console.log(res);
    //     //当请求成功的时候，渲染数据
    //     if(res.code == 100){
    //         //使用模板引擎渲染数据
    //         // 1 引入模板因
    //         // 2 书写模板
    //         // 3 使用模板的方法，生成结构
    //         var html = $("#mt").tmpl(res.data);
    //         // 4 渲染到页面上 -- 把结构添加到指定位置
    //         $("#dataset").append(html);
    //     }else{
    //         alert(res.msg);
    //     }
    //
    // },"json");

    //每页的数据量 - 具体根据每个用户自己的需求弄，我们暂定就是每页10条
    var pageCount = 10;
    //总的数据条数
    // var dataCount = 要从服务器返回了;
    var dataCount = 1004;
    //总共的页码数 -- 页码的最大值
    var maxCount = Math.ceil(dataCount / pageCount);
    //总共显示的按钮的个数
    var buttonCounts = 5;
    //开始页码
    var start;
    //结束页码
    var end;
    //当前页码 - 由点的按钮决定当前的页码是多少 , 一开始默认就是第一页
    var current = 1;

    //一开始调用一次，加载初识数据
    //getArticlesByPage(); -- 如果一开始就调用一次，这时分类的数据还没有获取过来，就没有分类的条件
    //在分类获取完成之后，再加载数据

    /**
     *  封装起来的根据条件和分页获取数据的方法
     * @param data 传递到服务的数据，是一个对象,可选
     *      键
     *          currentPage : 当前页码
     *          pageCount ：页面容纳的数据条数
     *          category_id : 分类id
     *          status : 文章状态数字
     */
    function getArticlesByPage() {
        //分页的获取数据
        //$.post("../php/articles/getArticlesByPage.php", { currentPage: current, pageCount: pageCount}, function (res) {


        //传递到后台的数据，给予默认值
        var data = {};

        var category_id = $("#categories").val();//获取筛选条件的值；
        var status = $("#status").val();//获取筛选条件的值；

        //如果分类选择的是所有分类 -- 不根据分类来筛选；
        if(category_id != ""){//如果不为空才有值；
            data.category_id = category_id;//把它的值给data对象；
        }
        //如果状态选择的是所有状态， 不根据状态筛选
        if(status != ""){//同上；
            data.status = status;
        }

        //currentPage: current, pageCount: pageCount
        //给 data 的键赋值
        data.currentPage = current;
        data.pageCount = pageCount;
        //请求后台的数据接口
        $.post("../php/articles/getArticlesByPageByCondition.php", data, function (res) {
            // console.log(res);
            // 使用模板引擎把数据加载到表格里面
            if (res.code == 100) {
                var html = $("#mt").tmpl(res.data);
                // 4 渲染到页面上 -- 首先把以前的数据清空，再把新的数据填充到表格
                // $("#dataset").html("").append(html);
                $("#dataset").empty().append(html);
            } else {
                alert(res.msg);
            }

            //把分页数据重新赋值
            dataCount = res.dataCount;
            maxCount = Math.ceil(dataCount / pageCount);
            //因为此时我们的数据已经发生改变，当初一开始生成的结构可能就不准确，
            // 每次点击分页按钮都是一次新的请求， 都要重新计算生成的开始和结尾等数据
            start = current - Math.floor(buttonCounts / 2);
            //如果开始页码小于1 开始页码就不能合理，强制把开始页码设置为1
            if (start < 1) {
                start = 1;
            }
            //结束的页码 -- 开始页码占了总数的一个， 还剩下  总个数 - 1
            end = start + buttonCounts - 1;
            //如果end 大于最大的页码数
            if (end > maxCount) {
                end = maxCount;
                //为了保证开始页码到结束页码还是5个按钮，重新计算出开始页码
                start = end - (buttonCounts - 1);
            }
            var html = "";
            //如果当前页是第一页，就没有上一页
            if(current != 1){
                html +="<li><a href='javascript:void(0);' class='page-button' page='"+(current -1)+"'>上一页</a></li>";
            }
            for (var i = start; i <= end; i++) {
                html += "<li><a href='javascript:void(0);' class='page-button' page='"+i+"'>" + i + "</a></li>";
            }

            //如果当前页已经是最后一页，没有下一页
            if(current != maxCount){
                html += "<li><a href='javascript:void(0);' class='page-button' page='"+(current+1)+"'>下一页</a></li>";
            }

            //把结构放到ul里面
            $("#pagination").html(html);
        }, "json");
    }


    /**
     *  如果要完成分页的逻辑
     *      1 先把动态生成的分页按钮先写好
     *
     *          需要的要素：
     *              所有的结构都是li里面包着a
     *
     *              <li><a href="javascript:void(0);" class="page-button" page="19">19</a></li>
     *
     *              一共有7个按钮
     *                  一个是上一页，一个是下一页
     *                  剩下5个都是数字
     *
     *          生成结构
     *              2.1 生成一个上一页
     *              2.2 循环5次生成5个按钮
     *              2.3 生成一个下一页
     *
     *     3 假设当前是第5页
     *          上一页 3 4 5 6 7 下一页
     *
     *          --->  有一个开始的页码  有一个当前的页码  有一个结束的页码
     *
     */

    /**
     *  点击按钮可以切换分页数据
     *
     *      给分页按钮注册点击事件
     *
     *      因为所有的分页按钮都是动态创建的，所以使用委托注册事件
     *
     */

    $("#pagination").on("click",".page-button",function () {//给父元素注册事件，委托；
        //获取被点击的按钮的代表的页码
        var thisPage = parseInt($(this).attr("page"));
        //切换分页数据 -- 也是根据点击的按钮决定当前页是多少，去服务器获取数据
        current = thisPage;
        getArticlesByPage();
    });


    /**
     *
     *   第三天的内容
     *      1  获取所有的分类
     */

    // 发送请求到服务器，获取所有的分类数据，在页面上生成一个下拉框

    $.post("../php/categories/getCategoriesAll.php",function (res) {
        //根据就返回的数据动态生成一个下拉框
        // console.log(res);
        if(res.code == 100){
            //把数据插入到下拉框
            var html = "<option value=''    >所有分类</option>";
            for (var i = 0; i < res.data.length ; i++){
                html += "<option value='"+ res.data[i].id +"'>"+ res.data[i].name +"</option>";
            }
            $("#categories").html(html);

            //最终封装好的获取数据的函数，必须是在把分类获取回来，并且声称分类结构之后，才能调用
            getArticlesByPage();
        }
    },"json");

    //点击筛选数据的功能
    $("#queryby").on("click",function () {
        //再次获取数据，填充到表格 -- 除了根据调价筛选，也要分页，所以最好把这个功能也跟以前的分页获取封装到一起
        // //获取条件的id和status的状态码
        // var category_id = $("#categories").val();
        // var status = $("#status").val();
        //
        // console.log(category_id,status);
        //
        // //准备传递到服务端的数据
        // var data = {
        //     // category_id: 2,
        //     // status: 0
        // };
        // //如果分类选择的是所有分类 -- 不根据分来筛选
        // if(category_id != ""){
        //     data.category_id = category_id;
        // }
        // //如果状态选择的是所有状态， 不根据状态筛选
        // if(status != ""){
        //     data.status = status;
        // }

        //调用封装好的分页获取数据和填充表格的方法
        // getArticlesByPage(data);
        getArticlesByPage();

        //这个是测试数据接口的代码
        // $.post("../php/articles/getArticlesByPageByCondition.php",data,function (res) {
        //     console.log(res);
        // });


    });

    //点击编辑按钮，可以跳转到 新增页面
    $("#dataset").on("click",".edit",function () {
        //获取articleid
        var id = $(this).parent().parent().attr("article_id");
        //让页面跳转到新增页面 -- 还要通过url传参的方式进行id的传递
        location.href="addArticle.html?id=" + id ;
    });


    // //删除
    // $("#dataset").on("click",".del",function () {
    //     //因为下面的this是指向调用它的事件源，不是点击的这个对象；所以先存起来；
    //     var _that=this;
    //    layer.confirm("请问您真的要删除吗",{icon :3}, function (index) {
    //        layer.close(index);
    //        //获取articleid
    //        var id = $(_that).parent().parent().attr("article_id");
    //        //让页面跳转到新增页面 -- 还要通过url传参的方式进行id的传递
    //        $.post("../php/articles/deleteById.php",{id : id}, function (res) {
    //            if(res.code==100){
    //                layer.alert(res.msg, {icon: 1}, function (index) {
    //                    location.reload();
    //                });
    //            } else {
    //                layer.alert(res.msg, {icon: 2});
    //            }
    //        },"json")
    //    })
    // });
    //删除
    // $("#dataset").on("click",".del", function () {
    //     var _that=this;
    //     layer.confirm("您确定要删除吗",{icon :3}, function (index) {
    //         layer.close(index);//关闭弹窗；
    //         var id=$(_that).parent().parent().attr("article_id");
    //         $.post("../php/articles/deleteById.php",{id : id}, function (res) {
    //             if(res.code==100){
    //                 layer.alert(res.msg,{icon :1}, function () {
    //                     location.reload();
    //                 });
    //             }else{
    //                 layer.alert(res.msg,{icon :2});
    //             }
    //         },"json");
    //     })
    // })
    //删除
    $("#dataset").on("click",".del", function () {
        var _that=this;//这里的this存在指向问题，所以先存起来；
        layer.confirm("您确定要删除吗",{icon :3}, function (index) {//confirm点确定会返回true；
            layer.close(index);//关闭框框；
            var id=$(_that).parent().parent().attr("article_id");
            $.post("../php/articles/deleteById.php",{id:id}, function (res) {
                if(res.code==100){
                    layer.alert(res.msg,{icon :1}, function () {
                        location.reload();//刷新当前页面；
                    });
                }else{
                    layer.alert(res.msg,{icon :2});
                }
            },"json")
        })
    })

    //点击全选，选择全部；
    $("thead input").on("click", function () {
        var checked=$(this).prop("checked");//既可以设置，又可以获取到它的选中与否，开关属性；
        $("#dataset .text-center input").prop("checked",checked);

        if(checked){
            $(".page-action .btn-danger").show();
        }else{
            $(".page-action .btn-danger").hide();
        }
    })
    //点击全部，全选选中，少一个，则不选中全选；
    $("#dataset").on("click", " .text-center input",function () {
        if($("#dataset .text-center input:checked").size()==pageCount){
            $("thead input").prop("checked",true);
        }else{
            $("thead input").prop("checked",false);
        };
        if($("#dataset .text-center input:checked").size()>1){
            $(".page-action .btn-danger").show();
        }else{
            $(".page-action .btn-danger").hide();
        }
    })

    //点击批量删除，然后删除；
    $(".page-action .btn-danger").on("click", function () {
       layer.confirm("你确定要删除吗",{icon :3}, function (index) {
           layer.close(index);
           //先获取选中的id；
           var ids=[];
           //再获取被选中的小框框：
           var cks=$("#dataset .text-center input:checked");
           // console.log(cds);
           //遍历这个数组；
           cks.each(function (index,element) {
               var id=$(element).parent().parent().attr("article_id");
               ids.push(id);
           })
           //把id发送到服务器：
           $.post("../php/articles/deleteAll.php",{ids:ids}, function (res) {
               if(res.code==100){
                   layer.alert(res.msg,{icon :1}, function () {
                       location.reload();
                   });
               }else{
                   layer.alert(res.msg,{icon :2});
               }
           },"json")
       })
    })
    // //点击批量删除按钮
    // $("#del-mul").on("click",function () {
    //
    //     var ids = [];
    //     // 把选中的下拉框的数据的 文章id 以数组的形式发送回服务器
    //     // 1 先找到所有被选中的checkbox
    //     var cks = $("#dataset input[type=checkbox]:checked");
    //     // 2 遍历这些选中的checkbox，找到其对应的数据id
    //     cks.each(function (index,element) {
    //         var id = $(element).parent().parent().attr("article_id");
    //         // 3 把这些id放到一个数组里面
    //         ids.push(id);
    //     });
    //
    //     // 4 把id数组发送到服务端
    //     $.post("../php/articles/deleteAll.php",{ids: ids},function (res) {
    //         if(res.code == 100){
    //             layer.alert(res.msg,{icon : 1},function () {
    //                 location.reload();
    //             })
    //         }else{
    //             layer.alert(res.msg,{icon : 1},function (index) {
    //                 layer.close(index);
    //             })
    //         }
    //     },"json");
    // });
});