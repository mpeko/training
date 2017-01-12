<?php

// PDOクラスのオブジェクトの作成
$dsn = 'mysql:dbname=training;host=localhost';
$user = 'testuser';
$password = 'wXJ00QFPtW51rhdK';

mb_language("uni");             //カレントの言語を設定
mb_internal_encoding("utf-8");  //内部文字コードを変更
mb_http_input("auto");          //HTTP入力文字エンコーディングを検出した結果を返す
mb_http_output("utf-8");        //HTTP 出力文字エンコーディングを設定

try{
    $dbh = new PDO($dsn, $user, $password);

    $sth = $dbh->prepare('select * from samples');
    $sth->execute();

    $userData = array();

    while($row = $sth->fetch(PDO::FETCH_ASSOC)){
        $userData[]=array(
        'id'=>$row['id'],
        'name'=>$row['name']
        );
    }

    //jsonとして出力
    header('Content-type: application/json');
    echo json_encode($userData);
    
}catch (PDOException $e){
    print('Error:'.$e->getMessage());
    die();
}

$dbh = null;

?>