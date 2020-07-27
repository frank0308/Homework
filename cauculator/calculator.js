//最大的問題是，操控數字時num裡面的數字被各種變換，偶爾會變成空字串或0就會出錯


let numbers = [];
let operator = [];
let messageArea = document.querySelector('.messageArea');
let preMessageArea = document.querySelector('.pre-messageArea');


document.querySelector('tbody').addEventListener('click', function (e) {
    if (e.target.getAttribute("data-type") == "number") {
        console.dir(e.target);
        messageArea.innerText += e.target.textContent;
        if (numbers.length != 0) {
            numbers[1] = messageArea.innerText;
        }
    }
    if (e.target.getAttribute("data-type") == "operator") {
        if (numbers.length == 2 && messageArea.innerText.length != 0 && numbers[0] != "") {
            preMessageArea.innerText = count();
        }
        operator[0] = e.target.textContent;
        if (numbers.length != 0) {
            numbers[1] = messageArea.innerText;
        } else {
            numbers[0] = messageArea.innerText;
        }
        messageArea.innerText += e.target.textContent;
        preMessageArea.innerText = numbers[0] + operator[0];
        messageArea.innerText = "";
        console.log(operator)
        console.log(numbers)
    }
    if (e.target.getAttribute("data-type") == "compute") {
        preMessageArea.innerText = "";
        count();
    }
    if (e.target.getAttribute("data-type") == "clean") {
        messageArea.innerText = "";
        preMessageArea.innerText = "";
        numbers.length = 0;
        operator.length = 0
    }
    if (e.target.getAttribute("data-type") == "numReturn") {
        messageArea.innerText = messageArea.innerText.slice(messageArea.length, -1);
    }

})

function count() {
    let result;
    if (operator[0] == "+" && numbers.length == 2) {
        result = Number(numbers[0]) + Number(numbers[1]);
        numbers[0] = result;
        numbers[1] = "";
    }
    if (operator[0] == "-" && numbers.length == 2) {
        result = Number(numbers[0]) - Number(numbers[1]);
        numbers[0] = result;
        numbers[1] = "";
    }
    if (operator[0] == "X" && numbers.length == 2) {
        result = Number(numbers[0]) * Number(numbers[1]);
        numbers[0] = result;
        numbers[1] = "";
    }
    if (operator[0] == "/" && numbers.length == 2) {
        result = Number(numbers[0]) / Number(numbers[1]);
        numbers[0] = result;
        numbers[1] = "";
    }
    messageArea.innerText = result.toString();
}
// function clickAction(){

// }












// let result = document.querySelector('.result');
// let operators = Array.from(document.querySelectorAll('.operators'))
// let numbers = Array.from(document.querySelectorAll('.numbers'))
// let divide = document.querySelector('.divide');
// let clean = document.querySelector('.clean');
// let numReturn = document.querySelector('.numReturn');

// console.log(numbers);
// for (const i of numbers) {
//     i.addEventListener('click', getNumber);
// }
// for (const i of operators) {
//     i.addEventListener('click', getNumber);
// }

// divide.addEventListener('click', function(){
//     result.innerText += "/";
// })
// clean.addEventListener('click', function(){
//     result.innerText = "";
// })
// numReturn.addEventListener('click', function(){
//     let tempText = result.innerText.split("");
//     tempText.length = tempText.length - 1;
//     result.innerText = tempText.join("");
// })

// function getNumber(){
//     result.innerText += this.innerText;
// }