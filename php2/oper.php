<?php

// 获得所有数据
function &getcsvdata() {
    $keys = explode( ",", "num,name,gender,birthdate,join_date,address,email,phone" );
    
    $dataStr = file_get_contents( "./db/db.csv" );
    $list = explode( "\r\n", $dataStr );
    
    $datas = array();
    if ( count( $list ) == 1 && strlen( trim( $list[ 0 ] ) ) == 0 ) return $datas;
    foreach( $list as $row ) {
        $tmp = explode( ",", $row );
        $datas[] = array_combine( $keys, $tmp );
    }
    return $datas;
}

// 在数组中找寻符合条件的索引
function findIndex( &$arr, $index ) {
    $len = count( $arr );
    for ( $i = 0; $i < $len; $i++ ) {
        if ( $arr[ $i ][ "num" ] == $index ) {
            return $i;
        }
    }
    return -1;
}


// 删除指定数据
function delete( $id ) {
    // 删除 $id 的数据
    $datas = &getcsvdata();
    $index = findIndex( $datas, $id );

    if ( $index > -1 ) {
        array_splice( $datas, $index, 1 );
    } else {
        return false;
    }

    $array = array();
    foreach( $datas as $item ) {
        $array[] = implode( ",", array_values( $item ) );
    }

    file_put_contents( "./db/db.csv", implode( "\r\n", $array ) );
    return true;
}




header( "Content-Type: application/json" );

if ( $_SERVER[ "REQUEST_METHOD" ] == "GET" ) {
    // 如果是 GET 请求, 则返回数据
    $datas = &getcsvdata();
    // var_dump( $datas );

    echo json_encode(array(
        "success"=> true,
        "result"=> $datas
    ));
    exit;

} elseif ( $_SERVER[ "REQUEST_METHOD" ] == "POST" ) {
    // POST 请求检查所带参数, 删除指定数据

    $id = isset( $_POST[ "id" ] ) ? $_POST[ "id" ] : -1;
    
    echo json_encode(array(
        "success"=> ($id > -1 ? delete( $id ) : false)
    ));
    exit;

} else {
    // 返回错误数据
    echo json_encode(array(
        "success"=> false
    ));
    exit;
}


?>