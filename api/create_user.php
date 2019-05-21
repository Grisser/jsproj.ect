<?php

    include 'config.php';

    $email = $_POST['email'];
    $login = $_POST['login'];
    $password = md5($_POST['password']);
    $randcode = rand(1000, 9999);

    mysqli_query($dbinfo, "INSERT INTO users (login, email, password, actcode) VALUES ('$login', '$email', '$password', '$randcode')");

    $mail = file_get_contents("mail.html");
    $mail = str_replace("{{user}}", $login, $mail);
    $mail = str_replace("{{code}}", $randcode, $mail);

    $headers = 'From: no-reply@jsproject.rugrisser.ru' . "\r\n" .
        'MIME-Version: 1.0' . "\r\n" .
        'Content-type: text/html; charset=iso-8859-1' . "\r\n";

    $mail = mail($email, "Подтвердите адрес E-mail", $mail, $headers);

    echo "success";