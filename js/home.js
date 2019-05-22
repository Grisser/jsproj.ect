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

    xhr.open('GET', 'api/get_projects.php?login=' + user, true);
    xhr.send();

    xhr.addEventListener('readystatechange', function(){

        if (xhr.readyState == 4 && xhr.status == 200) {

            let card = `<div class="cardLayout col-6 col-xl-4 col-lg-4 col-md-6 col-sm-6 align-self-center" style="height: 100%;">

                            <a href="project.html?id={{id}}" style="color: white;">

                                <div class="boardCard card bg-dark text-white" style="background-image: url('{{background}}');">
                                    
                                    <h1>{{title}}</h1>

                                </div>

                            </a>

                        </div>`;

            let json = JSON.parse(xhr.responseText);
            console.log(json);
            let template = Handlebars.compile(card);

            for (let element of json) {

                console.log(element);

                document.querySelector("#projlist").innerHTML += template(element);

            }

        }

    });

}