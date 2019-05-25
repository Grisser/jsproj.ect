'use strict';

function generateStucture(structure) {

    document.querySelector("#workspace").innerHTML = "";

    let json = JSON.parse(structure);
    let id = 0;
    let hasEditor = [];
    let creatingColumn = false;

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

                        let obj = {

                            title: addInput.value

                        };

                        column.items.push(obj);
                        ce.removeChild(document.querySelector("#create" + ci));
                        hasEditor[ci - 1] = false;

                        let itElement = document.createElement('div');
                        let body = document.createElement('div');
                        let head = document.createElement('h5');

                        itElement.classList.add('card');
                        itElement.classList.add('item');
                        body.classList.add('card-body');
                        head.classList.add('card-title');

                        head.innerHTML = obj.title;

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

        for (let item of column.items) {

            let itElement = document.createElement('div');
            let body = document.createElement('div');
            let head = document.createElement('h5');

            itElement.classList.add('card');
            itElement.classList.add('item');
            body.classList.add('card-body');
            head.classList.add('card-title');

            head.innerHTML = item.title;

            body.appendChild(head);
            itElement.appendChild(body);
            colElement.appendChild(itElement);

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

                    let obj = {

                        title: title.value,
                        items: []

                    };
                    
                    json.columns.push(obj);

                    console.log(JSON.stringify(json));

                    upRow.removeChild(title);
                    
                    title = document.createElement('span');
                    title.classList.add('col-10');
                    title.innerHTML = obj.title;

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

                            let obj = {

                                title: addInput.value

                            };

                            json.columns[id - 1].items.push(obj);

                            ce.removeChild(document.querySelector("#create" + ci));
                            hasEditor[ci - 1] = false;

                            let itElement = document.createElement('div');
                            let body = document.createElement('div');
                            let head = document.createElement('h5');

                            itElement.classList.add('card');
                            itElement.classList.add('item');
                            body.classList.add('card-body');
                            head.classList.add('card-title');

                            head.innerHTML = obj.title;

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

}