<?php

// PDOクラスのオブジェクトの作成
$dsn = 'mysql:dbname=training;host=localhost';
$user = 'testuser';
$password = 'wXJ00QFPtW51rhdK';
$title1 = '追加前のデータ一覧：<br>';
$title2 = '<br> 追加後のデータ一覧：<br>';

try{
    $dbh = new PDO($dsn, $user, $password);

    // print('追加前のデータ一覧：<br>');

    $sql = 'select id, name from samples';
    $stmt = $dbh->prepare($sql);
    $stmt->execute();


    while($result = $stmt->fetch(PDO::FETCH_ASSOC)){
        // print($result['id']);
        // print($result['name'].'<br>');
        // $defultData = array('id'=>$result['id'], 'name'=>$result['name']);
        var_dump($result);
    }
    
    $sql = 'insert into samples (id, name) values (?, ?)';
    $stmt = $dbh->prepare($sql);

    // print('<br> 追加後のデータ一覧：<br>');

    $sql = 'select id, name from samples';
    $stmt = $dbh->prepare($sql);
    $stmt->execute();

    while($result = $stmt->fetch(PDO::FETCH_ASSOC)){
        // print($result['id']);
        // print($result['name'].'<br>');
    }
    
}catch (PDOException $e){
    print('Error:'.$e->getMessage());
    die();
}

$dbh = null;

?>

<html>
<head><title>PHP TEST</title></head>
<body>

    <div>
        <?php echo $title1; ?>
        <?php
        while($result = $stmt->fetch(PDO::FETCH_ASSOC)){
        ?>
        <?php
        var_dump ($result);
        ?>
        <?php echo $result['id']; ?>
        <?php echo $result['name']; ?>
        <?php 
        } 
        ?>

        <?php echo $title2; ?>
    </div>

</body>
</html>