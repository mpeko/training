<html>
<head><title>PHP TEST</title></head>
<body>

<?php

// PDOクラスのオブジェクトの作成
$dsn = 'mysql:dbname=training;host=localhost';
$user = 'testuser';
$password = 'wXJ00QFPtW51rhdK';

try{
    $dbh = new PDO($dsn, $user, $password);

    print('追加前のデータ一覧：<br>');

    $sql = 'select id, name from samples';
    $stmt = $dbh->prepare($sql);
    $stmt->execute();

    while($result = $stmt->fetch(PDO::FETCH_ASSOC)){
        print($result['id']);
        print($result['name'].'<br>');
    }
    
    $sql = 'insert into samples (id, name) values (?, ?)';
    $stmt = $dbh->prepare($sql);
    $flag = $stmt->execute(array(5, 'eee'));

    print('<br> 追加後のデータ一覧：<br>');

    $sql = 'select id, name from samples';
    $stmt = $dbh->prepare($sql);
    $stmt->execute();

    while($result = $stmt->fetch(PDO::FETCH_ASSOC)){
        print($result['id']);
        print($result['name'].'<br>');
    }
    
}catch (PDOException $e){
    print('Error:'.$e->getMessage());
    die();
}

$dbh = null;

?>

</body>
</html>