<?php

    include 'config.php';

    $login = $_GET['login'];
    $projid = $_GET['id'];

    $query = mysqli_query($dbinfo, "SELECT * FROM projects ORDER BY id DESC LIMIT 1");
    $id = mysqli_fetch_array($query)['id'];

    $id++;

    $query = mysqli_query($dbinfo, "SELECT jsonstartstructure FROM projtemplates WHERE id = '$projid'");
    $structure = mysqli_fetch_array($query)['jsonstartstructure'];

    mysqli_query($dbinfo, "INSERT INTO projects (id, templateid, structure) VALUES ('$id', '$projid', '$structure')");

    $query = mysqli_query($dbinfo, "SELECT projects FROM users WHERE login = '$login'");
    $res = json_decode(mysqli_fetch_array($query)['projects']);
    array_push($res, $id);
    $res = json_encode($res);
    mysqli_query($dbinfo, "UPDATE users SET projects = '$res' WHERE login = '$login'");

    echo json_encode(["success" => true, "id" => $id]);