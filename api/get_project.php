<?php

    include 'config.php';

    $login = $_GET['login'];
    $id = $_GET['id'];

    $query = mysqli_query($dbinfo, "SELECT projects FROM users WHERE login = '$login'");
    $arr = json_decode(mysqli_fetch_array($query)['projects']);

    $belonging = false;

    foreach($arr as $element)
        if ($element == $id)
            $belonging = true;

    if ($belonging == false)
        echo "false";
    else {

        $query = mysqli_query($dbinfo, "SELECT * FROM projects WHERE id = '$id'");
        
        if (mysqli_num_rows($query) == 0)
            echo "false";
        else {

            $row = mysqli_fetch_array($query);
            echo json_encode(["projid" => $row['templateid'], "title" => $row['title'], "background" => $row['background'], "structure" => $row['structure']]);

        }

    }
