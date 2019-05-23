<?php

    include "config.php";

    $query = mysqli_query($dbinfo, "SELECT * FROM projtemplates");
    $arr = array();

    for ($i = 0; $i < mysqli_num_rows($query); $i++) {

        $element = mysqli_fetch_array($query);
        $arr += [["id" => $element['id'], "img" => "img/projectIcons/" . $element['id'] . ".svg", "title" => $element['title'], "desc" => $element['description']]];

    }

    echo json_encode($arr);