<?php

    include 'config.php';

    $login = $_GET['login'];
    $code = $_GET['code'];

    $query = mysqli_query($dbinfo, "SELECT * FROM users WHERE login = '$login' AND actcode = '$code'");

    if (mysqli_num_rows($query) == 1) {

        mysqli_query($dbinfo, "UPDATE users SET activated = 1, actcode = 10000, projects = \"[]\" WHERE login = '$login'");
        echo "success";

    } else 
        echo "error";