<?php

    include 'config.php';

    $login = $_GET['login'];

    $query = mysqli_query($dbinfo, "SELECT projects FROM users WHERE login = '$login'");
    $arr = json_decode(mysqli_fetch_array($query)['projects']);
    $projects = array();

    foreach($arr as $element) {

        $query = mysqli_query($dbinfo, "SELECT * FROM projects WHERE id = '$element'");
        $row = mysqli_fetch_array($query);
        array_push($projects, [ "id" => $element, "title" => $row['title'], "background" => $row['background'] ]);

    }

    echo json_encode($projects);