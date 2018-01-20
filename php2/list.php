<?php
header( "Content-Type: application/json" );

$keys = explode( ",", "num,name,gender,birthdate,join_date,address,email,phone" );

if ( $_SERVER[ "REQUEST_METHOD" ] == "GET" ) {
    $dataStr = file_get_contents( "./db.csv" );
    $list = explode( "\r\n", $dataStr );
    $datas = array();
    foreach( $list as $row ) {
        $tmp = explode( ",", $row );
        $datas[] = array_combine( $keys, $tmp );
    }

    echo json_encode(array(
        "success"=> true,
        "result"=> $datas
    ));
    exit;
}

echo json_encode(array(
    "success"=> false
));

?>