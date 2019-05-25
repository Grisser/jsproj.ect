'use strict';

function getCookie(name) {

    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;

}

function delete_cookie ( cookie_name ) {

    var cookie_date = new Date ( );
    cookie_date.setTime ( cookie_date.getTime() - 1 );
    document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();

}

let user = getCookie('user');

if (user == undefined)
    window.location.replace('login.html');
else {

    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'api/get_projects.php?login=' + user, true);
    xhr.send();

    xhr.addEventListener('readystatechange', function(){

        if (xhr.readyState == 4 && xhr.status == 200) {

            let card = `<div class="cardLayout col-6 col-xl-4 col-lg-4 col-md-6 col-sm-6 align-self-center" style="height: 100%;">

                            <a href="project.html?id={{id}}" style="color: white;">

                                <div class="boardCard card bg-dark text-white fadeIn animated" style="background-image: url('{{background}}');">
                                    
                                    <h1>{{title}}</h1>

                                </div>

                            </a>

                        </div>`;

            let json = JSON.parse(xhr.responseText);
            //console.log(json);
            let template = Handlebars.compile(card);

            for (let element of json) {

                if (element.title == "")
                    element.title = "Без названия";
                if (element.background == "")
                    element.background = "img/example.jpg";

                document.querySelector("#projlist").innerHTML += template(element);

            }

        }

    });

}

document.querySelector("#exit").addEventListener('click', function(){

    delete_cookie('user');
    window.location.replace('login.html');

});

$( document ).ready(function() {

    addCard.addEventListener('click', function(){
        
        $("#exampleModalCenter").modal('show');

        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'api/get_projects_list.php', true);
        xhr.send();

        xhr.addEventListener('readystatechange', function(){

            if (xhr.readyState == 4 && xhr.status == 200) {

                let json = JSON.parse(xhr.responseText);
                let card = `<div class="col-12 col-xl-4 col-lg-4 col-md-12 col-sm-12">

                                <div class="card">

                                    <img src="{{img}}" class="card-img-top">
                                    <div class="card-body">

                                        <h5 class="card-title">{{title}}</h5>
                                        <p class="card-text">{{desc}}</p>
                                        <button id="cardBut{{id}}" type="button" class="btn btn-primary" style="width: 100%;">Создать</button>

                                    </div>

                                </div>

                            </div>`;

                let template = Handlebars.compile(card);

                for (let element of json)
                    document.querySelector("#modalContainer").innerHTML += template(element);
                for (let element of json) {

                    document.querySelector("#cardBut" + element.id).addEventListener('click', function(){

                        let createXHR = new XMLHttpRequest();
                        
                        createXHR.open('GET', 'api/create_project.php?login=' + user + '&id=' + element.id, true);
                        createXHR.send();

                        createXHR.addEventListener('readystatechange', function(){

                            if (createXHR.readyState == 4 && createXHR.status == 200) {

                                let json = JSON.parse(createXHR.responseText);

                                if (json.success)
                                    window.location.replace("project.html?id=" + json.id);

                            }

                        });

                    });
                }

            }

        });

    });

}); 
