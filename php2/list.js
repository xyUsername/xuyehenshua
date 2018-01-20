var xhr=new XMLHttpRequest();
xhr.open("get","list.php");
xhr.onreadystatechange= function () {
    if(xhr.readyState ==4 && xhr.status == 200){
        var res=JSON.parse(xhr.responseText);
        console.log(res);
        if(res.success){
            console.log(res.result);
        }
    }
}
xhr.send();