<?php

    include 'config.php';

    $login = $_GET['login'];

    $query = mysqli_query($dbinfo, "SELECT * FROM users WHERE login = '$login'");
    
    if (mysqli_num_rows($query) == 0)
        echo "error";
    else {

        $row = mysqli_fetch_array($query);

        if ($row['activated'] == 0)
            echo "not activated";
        else
            echo "activated";

    }