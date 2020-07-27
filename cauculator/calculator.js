let calculateArea = [];
let result = document.querySelector('.result');
let operators = Array.from(document.querySelectorAll('.operators'))
let numbers = Array.from(document.querySelectorAll('.numbers'))
let divide = document.querySelector('.divide');
let clean = document.querySelector('.clean');
let numReturn = document.querySelector('.numReturn');

console.log(numbers);
for (const i of numbers) {
    i.addEventListener('click', getNumber);
}
for (const i of operators) {
    i.addEventListener('click', getNumber);
}

divide.addEventListener('click', function(){
    result.innerText += "/";
})
clean.addEventListener('click', function(){
    result.innerText = "";
})
numReturn.addEventListener('click', function(){
    let tempText = result.innerText.split("");
    tempText.length = tempText.length - 1;
    result.innerText = tempText.join("");
})

function getNumber(){
    result.innerText += this.innerText;
}
