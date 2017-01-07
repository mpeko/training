<?php
$inputtest = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $inputtest = $_POST['inputtest'];
}

?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <title>2.フォームから入力された値をechoで表示</title>
</head>
<body>
  <form action="" method="POST">
    <input type="text" name="inputtest" value="<?php echo htmlspecialchars($inputtest, ENT_QUOTES, 'UTF-8'); ?>">
    <input type="submit" value="確認">
    <p>値：<?php echo $inputtest; ?></p>
  </form>
</body>
</html>