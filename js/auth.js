'use strict';

let selected = 1;

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

    xhr.open('GET', 'api/check_user.php?login=' + login + '&password=' + password, true);
    xhr.send();

    xhr.addEventListener('readystatechange', function(){

        document.querySelector("#logerr").style.display = "none";

        if (xhr.readyState == 4 && xhr.status == 200) {

            if (xhr.responseText == "true")
                window.location.replace('home.html');
            else
                document.querySelector("#logerr").style.display = "block";

        }

    });

});
