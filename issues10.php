<?php

  // PDOクラスのオブジェクトの作成
  $dsn = 'mysql:dbname=training;host=localhost';
  $user = 'testuser';
  $password = 'wXJ00QFPtW51rhdK';

  $dbh = new PDO($dsn, $user, $password);

  $sql = 'select * from samples';

  //jsonとして出力
  header('Content-type: application/json');
  echo json_encode($dbh->query($sql)->fetchAll(PDO::FETCH_ASSOC));

?>