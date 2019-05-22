'use strict';

function getCookie(name) {

    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;

}

let user = getCookie('user');
let selected = 1;

if (user != undefined) {

    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'api/check_activation.php?login=' + user, true);
    xhr.send();

    xhr.addEventListener('readystatechange', function(){

        if (xhr.readyState == 4 && xhr.status == 200) {

            if (xhr.responseText == "activated")
                window.location.replace("home.html");
            else if (xhr.responseText == "not activated")
                window.location.replace("activate.html");

        }

    });

}

document.querySelector("#selLog").addEventListener('click', function(){

    if (selected == 2) {

        selected = 1;

        document.querySelector("#selReg").classList.remove("selected");
        document.querySelector("#selLog").classList.add("selected");
        document.querySelector("#reg").classList.add("hidden");
        document.querySelector("#login").classList.remove("hidden");

    }

});

document.querySelector("#selReg").addEventListener('click', function(){

    if (selected == 1) {

        selected = 2;

        document.querySelector("#selLog").classList.remove("selected");
        document.querySelector("#selReg").classList.add("selected");
        document.querySelector("#reg").classList.remove("hidden");
        document.querySelector("#login").classList.add("hidden");

    }

});

document.querySelector("#btnLog").addEventListener('click', function(){

    let login = document.querySelector("#logLog").value;
    let password = document.querySelector("#logPas").value;
    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'api/login.php?login=' + login + '&password=' + password, true);
    xhr.send();

    xhr.addEventListener('readystatechange', function(){

        document.querySelector("#logerr").style.display = "none";

        if (xhr.readyState == 4 && xhr.status == 200) {

            if (xhr.responseText == "true") {

                document.cookie = 'user=' + login;
                window.location.replace('home.html');
            
             } else if (xhr.responseText == "activate") {

                document.cookie = 'user=' + login;
                window.location.replace('activate.html');

             } else
                document.querySelector("#logerr").style.display = "block";

        }

    });

});

document.querySelector("#btnReg").addEventListener('click', function(){

    document.querySelector("#regerr").style.display = "none";

    let email = document.querySelector("#regEmail").value;
    let login = document.querySelector("#regLog").value;
    let password = document.querySelector("#regPas").value;
    let repeatPassword = document.querySelector("#regReppas").value;

    if (password != repeatPassword) {

        document.querySelector("#regerr").innerHTML = "Пароли не совпадают";
        document.querySelector("#regerr").style.display = "block";

    } else {

        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'api/check_user.php?login=' + login + '&email=' + email, true);
        xhr.send();

        xhr.addEventListener('readystatechange', function(){

            if (xhr.readyState == 4 && xhr.status == 200) {

                let json = JSON.parse(xhr.responseText);
                let mes = '';

                if (json.email && json.login)
                    mes = 'Аккаунт(ы) с таким логином и E-mail уже существует(ют)';
                else if (json.email)
                    mes = 'Аккаунт с таким E-mail уже существует';
                else if (json.login)
                    mes = 'Аккаунт с таким логином уже существует';

                if (mes != '') {

                    document.querySelector("#regerr").innerHTML = mes;
                    document.querySelector("#regerr").style.display = "block";

                } else {

                    let regXHR = new XMLHttpRequest();
                    let formData = new FormData();

                    formData.append("email", email);
                    formData.append("login", login);
                    formData.append("password", password);

                    regXHR.open('POST', 'api/create_user.php', true);
                    //regXHR.setRequestHeader('Content-Type', 'multipart/form-data');
                    regXHR.send(formData);

                    regXHR.addEventListener('readystatechange', function(){

                        if (regXHR.readyState == 4 && regXHR.status == 200) {

                            if (regXHR.responseText == 'success') {

                                document.cookie = 'user=' + login;
                                window.location.replace('activate.html');

                            } else
                                console.log(regXHR.responseText);

                        }

                    });

                }

            }

        });

    }

});
