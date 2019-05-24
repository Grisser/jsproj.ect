'use strict';

function loadStructure(structure) {

    document.querySelector("#projectblock").innerHTML = "";

    let json = JSON.parse(structure);

    for (let column of json.columns) {

        let colElement = document.createElement('div');
        let upRow = document.createElement('div');
        let title = document.createElement('span');
        let add = document.createElement('span');

        colElement.classList.add('deskColumn');
        upRow.classList.add('row');
        title.classList.add('col-10');
        add.classList.add('col-2');

        upRow.style.marginBottom = '7%';
        add.style.cursor = 'pointer';
        
        title.innerHTML = column.title;
        add.innerHTML = "+";

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

        document.querySelector("#projectblock").appendChild(colElement);

    }

}