'use strict';

function getCookie(name) {

    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;

}

let user = getCookie('user');

if (user == undefined)
    window.location.replace('login.html');
else {

    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'api/check_activation.php?login=' + user, true);
    xhr.send();

    xhr.addEventListener('readystatechange', function(){

        if (xhr.readyState == 4 && xhr.status == 200) {

            if (xhr.responseText == "activated")
                window.location.replace("home.html");

        }

    });

}

document.querySelector("#btnAct").addEventListener('click', function(){

    let code = document.querySelector("#actCode").value;

    let actXHR = new XMLHttpRequest();

    actXHR.open('GET', 'api/activate_user.php?login=' + user + '&code=' + code, true);
    actXHR.send();

    actXHR.addEventListener('readystatechange', function(){

        if (actXHR.readyState == 4 && actXHR.status == 200) {

            if (actXHR.responseText == "success") {

                window.location.replace("home.html");

            } else if (actXHR.responseText == "error") {

                document.querySelector("#acterr").innerHTML = "Ошибка: неправильный код активации";
                document.querySelector("#acterr").style.display = "block";
                document.querySelector("#info").style.marginBottom = "2%";

            } else {

                document.querySelector("#acterr").innerHTML = "Ошибка сервера";
                document.querySelector("#acterr").style.display = "block";
                document.querySelector("#info").style.marginBottom = "2%";
                console.log(actXHR.responseText);

            }

        }

    });

});