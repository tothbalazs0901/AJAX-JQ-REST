<?php

require './MySqlDB.php';
if($_SERVER['Request_method']==='DELETE'){
    $mySql = new MySqlDB();
    $id = $_GET['ID'];
    $mySql->torol('telefonkonyvem', 'ID='.$id);
}

?>

