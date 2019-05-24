'use strict';

function getCookie(name) {

    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;

}

function getAllUrlParams(url) {

    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  
    var obj = {};
  
    if (queryString) {
  
        queryString = queryString.split('#')[0];

        var arr = queryString.split('&');
    
        for (var i=0; i<arr.length; i++) {

            var a = arr[i].split('=');
    
            var paramNum = undefined;
            var paramName = a[0].replace(/\[\d*\]/, function(v) {

                paramNum = v.slice(1,-1);
                return '';

            });
    
            var paramValue = typeof(a[1])==='undefined' ? true : a[1];
    
            paramName = paramName.toLowerCase();
            paramValue = paramValue.toLowerCase();
    
            if (obj[paramName]) {

                if (typeof obj[paramName] === 'string') {
                    obj[paramName] = [obj[paramName]];
                }
                if (typeof paramNum === 'undefined') {
                    obj[paramName].push(paramValue);
                }
                else {
                    obj[paramName][paramNum] = paramValue;
                }

            }

            else {
                obj[paramName] = paramValue;
            }

        }

    }
  
    return obj;

}

let user = getCookie('user');
let id = getAllUrlParams().id;
let json;

if (id == undefined)
    window.location.replace("home.html");
if (user == undefined)
    window.location.replace('login.html');
else {

    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'api/get_project.php?login=' + user + '&id=' + id, true);
    xhr.send();

    xhr.addEventListener('readystatechange', function(){

        if (xhr.readyState == 4 && xhr.status == 200) {

            json = JSON.parse(xhr.responseText);

            if (json.title == "") {

                $("#exampleModalCenter").modal('show');

            }

            
            document.querySelector("#projectblock").style.backgroundImage = 'url(' + json.background + ')';

            $.getScript('templates/js/' + id + '.js', function(){

                loadStructure(json.structure);

            });

        }

    });

}

function hideSaveText() {

    document.querySelector("#saved").style.opacity = '0';

}

document.querySelector("#save").addEventListener('click', function(){

    document.querySelector("#saved").style.opacity = '1';
    let timerID = setTimeout(hideSaveText, 2000);

});

document.querySelector("#saveTitle").addEventListener('click', function(){

    json.title = document.querySelector('#inputTitle').value;

    let CTXHR = new XMLHttpRequest();
    let formData = new FormData();

    formData.append("title", json.title);
    formData.append("background", json.background);
    formData.append("structure", json.structure);

    CTXHR.open('POST', 'api/update_desk.php', true);
    CTXHR.send(formData);

    CTXHR.addEventListener('readystatechange', function(){

        if (CTXHR.readyState == 4 && CTXHR.status == 200) {

            $("#exampleModalCenter").modal('hide');

            document.querySelector("#panelTitle").value = json.title;
            document.querySelector("#projectblock").style.backgroundImage = 'url(' + json.background + ')';

            //loadStructure(json.structure);

        }

    });

});