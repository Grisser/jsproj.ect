<?php

    include 'config.php';

    $login = $_GET['login'];
    $password = md5($_GET['password']);

    $query = mysqli_query($dbinfo, "SELECT * FROM users WHERE login = '$login' AND password = '$password'");

    if (mysqli_num_rows($query) == 0) {
        echo "false";
    } else {
        echo "true";
    }