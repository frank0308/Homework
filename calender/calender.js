// Set Time
let nowMonth = new Date();
nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1)

let month = document.querySelector('.month');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
month.innerText = months[nowMonth.getMonth()];

let year = document.querySelector('.year')
year.innerText = nowMonth.getFullYear()

//Set control items
let title;
let content;
let time;
let place;
let selectedDay;
let toDoList = document.querySelector('#exampleModal .modal-body ul');
let btnNext = document.querySelector('.next')
let btnPrev = document.querySelector('.prev')
let btnSaveData = document.querySelector('.save')
let btnClose = document.querySelector('#exampleModal .close')

//Set events
btnNext.addEventListener('click', function () {
    nextMonth()
})
btnPrev.addEventListener('click', function () {
    previousMonth();
})
btnSaveData.addEventListener('click', function () {
    saveData();
    title = "";
    content = "";
    time = "";
    place = "";
    $('#inputModal').modal('hide');
    $('#exampleModal').modal('show');
    event.stopPropagation();

})
btnClose.addEventListener('click', function () {
    for (let i = 0; i < selectedDay.children.length; i++) {
        selectedDay.children[i].remove();
    }
    console.dir(selectedDay)
    createPin(selectedDay);
})

createCalender(nowMonth);


function createCalender(date) {
    let body = document.querySelector('.calender')

    //table
    let table = document.createElement('table');
    table.classList.add('w-100', 'm-auto');
    body.append(table);

    //thead
    let thead = document.createElement('thead');
    table.append(thead);

    //tr,th
    let tr = document.createElement('tr')
    thead.append(tr);
    const weeks = ['Sun', 'Mon', 'The', 'Wed', 'Thr', 'Fri', 'Sat']
    for (let i = 0; i < 7; i++) {
        let th = document.createElement('th')
        th.innerText = weeks[i];
        tr.append(th);
    }

    //tbody
    let tbody = document.createElement('tbody');
    thead.after(tbody);

    //tr,td
    let firstTr = document.createElement('tr');
    let firstDay = date.getDay();
    tbody.append(firstTr);
    for (let i = 0; i < 7; i++) {
        let firstTd = document.createElement('td');
        firstTr.append(firstTd);

        if (firstDay <= i) {
            firstTd.addEventListener('click', function (e) {
                $('#exampleModal').modal('show');
                selectedDay = e.target.closest('td');
                let key = `${nowMonth.getFullYear()}` + " " + `${nowMonth.getMonth()}` + " " + `${selectedDay.innerText.split(/\s+/)[0]}`
                if (localStorage.hasOwnProperty(key)) {
                    createList(key)
                } else {
                    toDoList.innerHTML = ""
                }
            })
            firstTd.classList.add('selectableTd')
            firstTd.innerText = i - firstDay + 1
            createPin(firstTd);
        }
    }
    let totalDate = new Date(2020, nowMonth.getMonth() + 1, 0).getDate()
    let restDay = 7 - firstDay + 1;
    for (let i = 0; i < Math.ceil((totalDate - (7 - firstDay)) / 7); i++) {
        let midTr = document.createElement('tr')
        tbody.append(midTr);
        for (let i = 0; i < 7; i++) {
            let midTd = document.createElement('td')
            midTr.append(midTd);
            if (restDay <= totalDate) {
                midTd.addEventListener('click', function (e) {
                    $('#exampleModal').modal('show');
                    selectedDay = e.target.closest('td');
                    let key = `${nowMonth.getFullYear()}` + " " + `${nowMonth.getMonth()}` + " " + `${selectedDay.innerText.split(/\s+/)[0]}`
                    if (localStorage.hasOwnProperty(key)) {
                        createList(key)
                    } else {
                        toDoList.innerHTML = ""
                    }
                })
                midTd.classList.add('selectableTd')
                midTd.innerText = restDay
                createPin(midTd)
            }
            restDay++
        }
    }
}

function nextMonth() {
    let table = document.querySelector('table')
    table.remove();
    nowMonth.setMonth(nowMonth.getMonth() + 1);
    createCalender(nowMonth);
    month.innerText = months[nowMonth.getMonth()];
    year.innerText = nowMonth.getFullYear()
}

function previousMonth() {
    let table = document.querySelector('table')
    table.remove();
    nowMonth.setMonth(nowMonth.getMonth() - 1);
    createCalender(nowMonth);
    month.innerText = months[nowMonth.getMonth()];
    year.innerText = nowMonth.getFullYear()
}

function saveData() {
    let todoArray;
    let timeStamp = nowMonth.getFullYear() + " " + nowMonth.getMonth() + " " + selectedDay.innerText.split(/\s+/)[0];
    if (localStorage.hasOwnProperty(timeStamp)) {
        todoArray = JSON.parse(localStorage.getItem(timeStamp));
    } else {
        todoArray = []
    }
    title = document.querySelector('#inputModal form #title').value
    content = document.querySelector('#inputModal form #textarea').value
    time = document.querySelector('#inputModal form #time').value
    place = document.querySelector('#inputModal form #place').value
    let temp = {
        title: title,
        content: content,
        time: time,
        place: place,
    }
    todoArray.push(temp)
    localStorage.setItem(timeStamp, JSON.stringify(todoArray))

    createList(timeStamp)
}

function createList(key) {

    let data = JSON.parse(localStorage.getItem(key));
    console.log(data)
    toDoList.innerHTML = ""
    for (let i = 0; i < data.length; i++) {

        let toDoListTemp = document.querySelector('template');
        let cloneContent = toDoListTemp.content.cloneNode(true)
        cloneContent.querySelector('li').classList.add('list-group-item')
        cloneContent.querySelector('h6').innerText = data[i].title
        let contents = cloneContent.querySelectorAll('p');
        contents[0].innerText = data[i].content;
        contents[1].innerText = data[i].time;
        contents[2].innerText = data[i].place;
        toDoList.append(cloneContent);
    }
}

function createPin(father) {
    let key = `${nowMonth.getFullYear()}` + " " + `${nowMonth.getMonth()}` + " " + `${father.innerText.split(/\s+/)[0]}`
    if (localStorage.hasOwnProperty(key)) {
        let data = JSON.parse(localStorage.getItem(key));
        let listContainer = document.createElement('div');
        father.append(listContainer)

        for (let i = 0; i < data.length; i++) {
            let p = document.createElement('p');
            p.innerText = data[i].title;
            listContainer.append(p)
            if( i == 1){
                break;
            }
        }
        console.dir(father)
        console.log(father.children)
        if (data.length > 2) {
            let more = document.createElement('p')
            more.innerText = 'more...'
            more.classList.add('more')
            listContainer.append(more)
        }
    } else {
        return
    }

}