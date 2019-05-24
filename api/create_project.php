<?php

    include 'config.php';

    $login = $_GET['login'];
    $projid = $_GET['id'];

    $query = mysqli_query($dbinfo, "SELECT * FROM projects ORDER BY id DESC LIMIT 1");
    $id = mysqli_fetch_array($query)['id'];

    $id++;

    mysqli_query($dbinfo, "INSERT INTO projects (id, templateid) VALUES ('$id', '$projid')");

    $query = mysqli_query($dbinfo, "SELECT projects FROM users WHERE login = '$login'");
    $res = json_decode(mysqli_fetch_array($query)['projects']);
    array_push($res, $id);
    $res = json_encode($res);
    mysqli_query($dbinfo, "UPDATE users SET projects = '$res' WHERE login = '$login'");

    echo json_encode(["success" => true, "id" => $id]);