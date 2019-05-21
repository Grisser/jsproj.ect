<?php

    include 'config.php';

    $email = $_GET['email'];
    $login = $_GET['login'];

    $arr = array(

        "email" => false,
        "login" => false

    );

    $query = mysqli_query($dbinfo, "SELECT * FROM users WHERE email = '$email'");

    if (mysqli_num_rows($query) != 0)
        $arr["email"] = true;

    $query = mysqli_query($dbinfo, "SELECT * FROM users WHERE login = '$login'");

    if (mysqli_num_rows($query) != 0)
        $arr["login"] = true;

    echo json_encode($arr);