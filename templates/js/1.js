'use strict';

function generateStucture(projid, projtitle, background, structure) {

    document.querySelector("#workspace").innerHTML = "";

    let json = JSON.parse(structure);
    let id = 0;
    let hasEditor = [];
    let creatingColumn = false;
    let selectedItem;

    document.querySelector("#panelTitle").value = projtitle;
    document.querySelector("#panelDesc").value = json.desc;
    document.querySelector("#panelBackground").value = background;

    for (let column of json.columns) {

        id += 1;
        hasEditor.push(false);

        let ci = id;

        let colElement = document.createElement('div');
        let upRow = document.createElement('div');
        let title = document.createElement('span');
        let add = document.createElement('span');

        colElement.id = "col" + id;

        colElement.classList.add('deskColumn');
        upRow.classList.add('row');
        title.classList.add('col-10');
        add.classList.add('col-2');

        upRow.style.marginBottom = '7%';
        add.style.cursor = 'pointer';
        
        title.innerHTML = column.title;
        add.innerHTML = "+";

        let ce = colElement;

        add.addEventListener('click', function(){

            if (hasEditor[ci - 1] == false) {

                hasEditor[ci - 1] = true; 

                let addCard = document.createElement('div');
                let addBody = document.createElement('div');
                let addInput = document.createElement('input');

                addCard.id = "create" + ci;

                addCard.classList.add('card');
                addCard.classList.add('item');
                addBody.classList.add('card-body');
                addInput.classList.add('form-control');

                addInput.placeholder = "Введите заголовок проекта";

                addInput.addEventListener('blur', function(){

                    if (addInput.value == "") {

                        ce.removeChild(document.querySelector("#create" + ci));
                        hasEditor[ci - 1] = false;
                        
                    } else {

                        let item = {

                            title: addInput.value

                        };

                        column.items.push(item);
                        ce.removeChild(document.querySelector("#create" + ci));
                        hasEditor[ci - 1] = false;

                        let itElement = document.createElement('div');
                        let body = document.createElement('div');
                        let head = document.createElement('h5');

                        itElement.classList.add('card');
                        itElement.classList.add('item');
                        body.classList.add('card-body');
                        head.classList.add('card-title');

                        head.innerHTML = item.title;

                        itElement.addEventListener('click', function() {

                            document.querySelector("#cardInfoTitle").innerHTML = item.title;
                            document.querySelector("#cardInfoDeadlinePlaceholder").innerHTML = "";
                            document.querySelector("#cardInfoLinksPlaceholder").innerHTML = "";
                            document.querySelector("#cardInfoBody").removeChild(document.querySelector("#cardInfoBody").lastChild);
            
                            if (item.desc != undefined) {
            
                                document.querySelector("#cardInfoDesc").innerHTML = item.desc;
            
                            }
            
                            if (item.deadline == undefined) {
            
                                let addDeadline = document.createElement('span');
            
                                addDeadline.innerHTML = "+ Добавить срок выполнения";
                                addDeadline.style.color = "blue";
                                addDeadline.style.cursor = "pointer";
            
                                addDeadline.addEventListener('click', function() {
            
                                    let di = `<div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">Дедлайн</span>
                                                </div>
                                                <input id="cardInfoDeadline" type="date" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                            </div>`;
            
                                    document.querySelector("#cardInfoDeadlinePlaceholder").innerHTML = di;
            
                                });
            
                                document.querySelector("#cardInfoDeadlinePlaceholder").appendChild(addDeadline);
            
                            } else {
            
                                let di = `<div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">Дедлайн</span>
                                            </div>
                                            <input id="cardInfoDeadline" type="date" value="` + item.deadline + `" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                        </div>`;
            
                              document.querySelector("#cardInfoDeadlinePlaceholder").innerHTML = di;
            
                            }
            
                            if (item.links != undefined) {
            
                                for (let link of item.links) {
            
                                    let li = `<div class="input-group mb-3" style="margin-top: 1.5%;">
                                                <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">Ссылка</span>
                                                </div>
                                                <input type="text" value="` + link + `" class="cardInfoLink form-control" aria-label="Username" aria-describedby="basic-addon1">
                                            </div>`;
            
                                    document.querySelector("#cardInfoLinksPlaceholder").innerHTML += li;
            
                                }
            
                            }
            
                            let addLink = document.createElement('span');
            
                            addLink.innerHTML = "+ Добавить ссылку";
                            addLink.style.color = "blue";
                            addLink.style.cursor = "pointer";
            
                            addLink.addEventListener('click', function(){
            
                                let li = `<div class="input-group mb-3" style="margin-top: 1.5%;">
                                            <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">Ссылка</span>
                                            </div>
                                            <input type="text" class="cardInfoLink form-control" aria-label="Username" aria-describedby="basic-addon1">
                                        </div>`;
            
                                document.querySelector("#cardInfoLinksPlaceholder").innerHTML += li;
            
                            });
            
                            document.querySelector("#cardInfoBody").appendChild(addLink);
                            document.querySelector("#saveCardInfo").onclick = function() {
            
                                item.title = document.querySelector("#cardInfoTitle").innerHTML;
            
                                if (document.querySelector("#cardInfoDesc").value != "")
                                    item.desc = document.querySelector("#cardInfoDesc").value;
                                
                                let deadlineel = document.getElementById("cardInfoDeadline");
            
                                if (deadlineel != null) {
            
                                    if (deadlineel.value != "")
                                        item.deadline = deadlineel.value;
                                    else
                                        delete item.deadline;
            
                                }
            
                                let linksel = document.querySelectorAll(".cardInfoLink");
                                item.links = [];
            
                                for (let linkel of linksel) {
                                
                                    if (linkel.value != "")
                                        item.links.push(linkel.value);
            
                                }
            
                                $("#cardInfo").modal('hide');
            
                            };
            
                            $("#cardInfo").modal('show');
            
                        });

                        body.appendChild(head);
                        itElement.appendChild(body);
                        colElement.appendChild(itElement);

                    }

                });

                addBody.appendChild(addInput);
                addCard.appendChild(addBody);

                ce.appendChild(addCard);

            }

        });

        upRow.appendChild(title);
        upRow.appendChild(add);

        colElement.appendChild(upRow);

        let itid = 0;

        for (let item of column.items) {

            let itElement = document.createElement('div');
            let body = document.createElement('div');
            let head = document.createElement('h5');

            itElement.classList.add('card');
            itElement.classList.add('item');
            body.classList.add('card-body');
            head.classList.add('card-title');

            itElement.style.cursor = 'pointer';

            let citid = itid;

            itElement.addEventListener('click', function() {

                

                document.querySelector("#cardInfoTitle").innerHTML = item.title;
                document.querySelector("#cardInfoDeadlinePlaceholder").innerHTML = "";
                document.querySelector("#cardInfoLinksPlaceholder").innerHTML = "";
                document.querySelector("#cardInfoBody").removeChild(document.querySelector("#cardInfoBody").lastChild);

                if (item.desc != undefined) {

                    document.querySelector("#cardInfoDesc").innerHTML = item.desc;

                }

                if (item.deadline == undefined) {

                    let addDeadline = document.createElement('span');

                    addDeadline.innerHTML = "+ Добавить срок выполнения";
                    addDeadline.style.color = "blue";
                    addDeadline.style.cursor = "pointer";

                    addDeadline.addEventListener('click', function() {

                        let di = `<div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Дедлайн</span>
                                    </div>
                                    <input id="cardInfoDeadline" type="date" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                </div>`;

                        document.querySelector("#cardInfoDeadlinePlaceholder").innerHTML = di;

                    });

                    document.querySelector("#cardInfoDeadlinePlaceholder").appendChild(addDeadline);

                } else {

                    let di = `<div class="input-group mb-3">
                                <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">Дедлайн</span>
                                </div>
                                <input id="cardInfoDeadline" type="date" value="` + item.deadline + `" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                            </div>`;

                  document.querySelector("#cardInfoDeadlinePlaceholder").innerHTML = di;

                }

                if (item.links != undefined) {

                    for (let link of item.links) {

                        let li = `<div class="input-group mb-3" style="margin-top: 1.5%;">
                                    <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Ссылка</span>
                                    </div>
                                    <input type="text" value="` + link + `" class="cardInfoLink form-control" aria-label="Username" aria-describedby="basic-addon1">
                                </div>`;

                        document.querySelector("#cardInfoLinksPlaceholder").innerHTML += li;

                    }

                }

                let addLink = document.createElement('span');

                addLink.innerHTML = "+ Добавить ссылку";
                addLink.style.color = "blue";
                addLink.style.cursor = "pointer";

                addLink.addEventListener('click', function(){

                    let li = `<div class="input-group mb-3" style="margin-top: 1.5%;">
                                <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">Ссылка</span>
                                </div>
                                <input type="text" class="cardInfoLink form-control" aria-label="Username" aria-describedby="basic-addon1">
                            </div>`;

                    document.querySelector("#cardInfoLinksPlaceholder").innerHTML += li;

                });

                document.querySelector("#cardInfoBody").appendChild(addLink);
                document.querySelector("#deleteCard").onclick = function() {

                    if (citid > 0)
                        json.columns[ci - 1].items.splice(citid, citid);
                    else
                        json.columns[ci - 1].items.splice(citid, citid + 1);

                    itid -= 1;
                    colElement.removeChild(itElement);
                    $("#cardInfo").modal('hide');

                    console.log(JSON.stringify(json));

                }
                document.querySelector("#saveCardInfo").onclick = function() {

                    item.title = document.querySelector("#cardInfoTitle").innerHTML;

                    if (document.querySelector("#cardInfoDesc").value != "")
                        item.desc = document.querySelector("#cardInfoDesc").value;
                    
                    let deadlineel = document.getElementById("cardInfoDeadline");

                    if (deadlineel != null) {

                        if (deadlineel.value != "")
                            item.deadline = deadlineel.value;
                        else
                            delete item.deadline;

                    }

                    let linksel = document.querySelectorAll(".cardInfoLink");
                    item.links = [];

                    for (let linkel of linksel) {
                                
                        if (linkel.value != "")
                            item.links.push(linkel.value);

                    }

                    $("#cardInfo").modal('hide');

                };

                $("#cardInfo").modal('show');

            });

            head.innerHTML = item.title;

            body.appendChild(head);
            itElement.appendChild(body);
            colElement.appendChild(itElement);

            itid += 1;

        }

        document.querySelector("#workspace").appendChild(colElement);

    }

    let createCard = document.createElement('div');

    createCard.classList.add('deskColumn');
    createCard.style.opacity = '0.4';
    createCard.style.cursor = 'pointer';
    createCard.innerHTML = '<b>Нажмите сюда, чтобы создать новую колонку</b>';

    createCard.addEventListener('click', function(){

        if (creatingColumn == false) {

            creatingColumn = true;

            id += 1;
            hasEditor.push(false);

            let ci = id;

            let colElement = document.createElement('div');
            let upRow = document.createElement('div');
            let title = document.createElement('input');
            let add = document.createElement('span');

            colElement.id = "col" + id;

            colElement.classList.add('deskColumn');
            upRow.classList.add('row');
            title.classList.add('col-10');
            title.classList.add('form-control');
            add.classList.add('col-2');

            upRow.style.marginBottom = '7%';
            add.style.cursor = 'pointer';
            
            add.innerHTML = "+";

            let ce = colElement;

            title.addEventListener('blur', function(){

                if (title.value == "") {

                    creatingColumn = false;
                    document.querySelector("#workspace").removeChild(colElement);
                    id -= 1;

                } else {

                    creatingColumn = false;

                    let item = {

                        title: title.value,
                        items: []

                    };
                    
                    json.columns.push(item);

                    upRow.removeChild(title);
                    
                    title = document.createElement('span');
                    title.classList.add('col-10');
                    title.innerHTML = item.title;

                    upRow.insertBefore(title, add);

                }

            });

            add.addEventListener('click', function(){

                if (hasEditor[ci - 1] == false) {

                    hasEditor[ci - 1] = true; 

                    let addCard = document.createElement('div');
                    let addBody = document.createElement('div');
                    let addInput = document.createElement('input');

                    addCard.id = "create" + ci;

                    addCard.classList.add('card');
                    addCard.classList.add('item');
                    addBody.classList.add('card-body');
                    addInput.classList.add('form-control');

                    addInput.placeholder = "Введите заголовок проекта";

                    addInput.addEventListener('blur', function(){

                        if (addInput.value == "") {

                            ce.removeChild(document.querySelector("#create" + ci));
                            hasEditor[ci - 1] = false;
                            
                        } else {

                            let item = {

                                title: addInput.value

                            };

                            json.columns[ci - 1].items.push(item);

                            ce.removeChild(document.querySelector("#create" + ci));
                            hasEditor[ci - 1] = false;

                            let itElement = document.createElement('div');
                            let body = document.createElement('div');
                            let head = document.createElement('h5');

                            itElement.classList.add('card');
                            itElement.classList.add('item');
                            body.classList.add('card-body');
                            head.classList.add('card-title');

                            head.innerHTML = item.title;

                            itElement.addEventListener('click', function() {

                                document.querySelector("#cardInfoTitle").innerHTML = item.title;
                                document.querySelector("#cardInfoDeadlinePlaceholder").innerHTML = "";
                                document.querySelector("#cardInfoLinksPlaceholder").innerHTML = "";
                                document.querySelector("#cardInfoBody").removeChild(document.querySelector("#cardInfoBody").lastChild);
                
                                if (item.desc != undefined) {
                
                                    document.querySelector("#cardInfoDesc").innerHTML = item.desc;
                
                                }
                
                                if (item.deadline == undefined) {
                
                                    let addDeadline = document.createElement('span');
                
                                    addDeadline.innerHTML = "+ Добавить срок выполнения";
                                    addDeadline.style.color = "blue";
                                    addDeadline.style.cursor = "pointer";
                
                                    addDeadline.addEventListener('click', function() {
                
                                        let di = `<div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon1">Дедлайн</span>
                                                    </div>
                                                    <input id="cardInfoDeadline" type="date" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                                </div>`;
                
                                        document.querySelector("#cardInfoDeadlinePlaceholder").innerHTML = di;
                
                                    });
                
                                    document.querySelector("#cardInfoDeadlinePlaceholder").appendChild(addDeadline);
                
                                } else {
                
                                    let di = `<div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">Дедлайн</span>
                                                </div>
                                                <input id="cardInfoDeadline" type="date" value="` + item.deadline + `" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                            </div>`;
                
                                  document.querySelector("#cardInfoDeadlinePlaceholder").innerHTML = di;
                
                                }
                
                                if (item.links != undefined) {
                
                                    for (let link of item.links) {
                
                                        let li = `<div class="input-group mb-3" style="margin-top: 1.5%;">
                                                    <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon1">Ссылка</span>
                                                    </div>
                                                    <input type="text" value="` + link + `" class="cardInfoLink form-control" aria-label="Username" aria-describedby="basic-addon1">
                                                </div>`;
                
                                        document.querySelector("#cardInfoLinksPlaceholder").innerHTML += li;
                
                                    }
                
                                }
                
                                let addLink = document.createElement('span');
                
                                addLink.innerHTML = "+ Добавить ссылку";
                                addLink.style.color = "blue";
                                addLink.style.cursor = "pointer";
                
                                addLink.addEventListener('click', function(){
                
                                    let li = `<div class="input-group mb-3" style="margin-top: 1.5%;">
                                                <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">Ссылка</span>
                                                </div>
                                                <input type="text" class="cardInfoLink form-control" aria-label="Username" aria-describedby="basic-addon1">
                                            </div>`;
                
                                    document.querySelector("#cardInfoLinksPlaceholder").innerHTML += li;
                
                                });
                
                                document.querySelector("#cardInfoBody").appendChild(addLink);
                                document.querySelector("#deleteCard").onclick = function() {
                
                                    //delete item;
                
                                }
                                document.querySelector("#saveCardInfo").onclick = function() {
                
                                    item.title = document.querySelector("#cardInfoTitle").innerHTML;
                
                                    if (document.querySelector("#cardInfoDesc").value != "")
                                        item.desc = document.querySelector("#cardInfoDesc").value;
                                    
                                    let deadlineel = document.getElementById("cardInfoDeadline");
                
                                    if (deadlineel != null) {
                
                                        if (deadlineel.value != "")
                                            item.deadline = deadlineel.value;
                                        else
                                            delete item.deadline;
                
                                    }
                
                                    let linksel = document.querySelectorAll(".cardInfoLink");
                                    item.links = [];
                
                                    for (let linkel of linksel) {
                                                
                                        if (linkel.value != "")
                                            item.links.push(linkel.value);
                
                                    }
                
                                    $("#cardInfo").modal('hide');
                
                                };
                
                                $("#cardInfo").modal('show');
                
                            });

                            body.appendChild(head);
                            itElement.appendChild(body);
                            colElement.appendChild(itElement);

                        }

                    });

                    addBody.appendChild(addInput);
                    addCard.appendChild(addBody);

                    ce.appendChild(addCard);

                }

            });

            upRow.appendChild(title);
            upRow.appendChild(add);

            colElement.appendChild(upRow);

            document.querySelector("#workspace").insertBefore(colElement, document.querySelector("#workspace").lastChild);

        }

    });

    document.querySelector("#workspace").appendChild(createCard);

    document.querySelector("#save").addEventListener('click', function(){

        let xhr = new XMLHttpRequest();
        let formData = new FormData();

        projtitle = document.querySelector("#panelTitle").value;
        json.desc = document.querySelector("#panelDesc").value;
        background = document.querySelector("#panelBackground").value;

        document.querySelector("#projectblock").style.backgroundImage = 'url(' + background + ')';

        formData.append("id", projid);
        formData.append("title", projtitle);
        formData.append("background", background);
        formData.append("structure", JSON.stringify(json));

        xhr.open('POST', 'api/update_desk.php', true);
        xhr.send(formData);

        xhr.addEventListener('readystatechange', function(){

            if (xhr.readyState == 4 && xhr.status == 200) {

                document.querySelector("#saved").style.opacity = '1';
                let timerID = setTimeout(hideSaveText, 2000);

            }

        });
    
    });

}