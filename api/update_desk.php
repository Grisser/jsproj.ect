<?php

    include 'config.php';

    $id = $_POST['id'];
    $title = $_POST['title'];
    $background = $_POST['background'];
    $structure = $_POST['structure'];

    mysqli_query($dbinfo, "UPDATE projects SET title = '$title', background = '$background', structure = '$structure' WHERE id = '$id'");

    echo "ok";