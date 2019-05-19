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

