let correct;
let btnStart = document.querySelector('.start');
let btnRestart = document.querySelector('.restart');
let btnCheck = document.querySelector('.check-answer');
let btnGuess = document.querySelector('.btn-guess');
let guessSection = document.querySelector('.input-group')
btnGuess.addEventListener('click', function () {
    if (isValid()) {
        addMessage("try");
    }
    document.querySelector(".answer").value = "";
})
btnStart.addEventListener('click', function () {
    correct = createNumber();
    removeOldMessage();
    btnRestart.style.visibility = "visible";
    btnCheck.style.visibility = "visible";
    guessSection.style.visibility = "visible";
    btnStart.style.visibility = "hidden";
})
btnRestart.addEventListener('click', function () {
    removeOldMessage();
    correct = createNumber();
    document.querySelector(".answer").value = "";
})
btnCheck.addEventListener('click', function () {
    addMessage("check");
})





function createNumber() {
    let nums = [];
    while (nums.length < 4) {
        let num = Math.floor(Math.random() * (10 - 0) + 0);
        if (nums.find((i) => i == num) == undefined) {
            nums.push(num);
        }
    }
    return nums.join("");
}

function checkAnswer(question) {
    let answer = document.querySelector(".answer").value.split("");
    let B = question.split("").filter((i) => {
        return answer.indexOf(i) > -1;
    })
    let A = 0;
    for (const i of B) {
        if (question.indexOf(i) == answer.indexOf(i)) {
            A++;
        }
    }
    return `${A}A${B.length - A}B`;
}

function addMessage(action) {
    let messageContainer = document.querySelector('.text-box');
    let message = document.createElement("li");
    let oldMessage = document.querySelectorAll('.text-box li');
    if (oldMessage.length > 4) {
        oldMessage[0].remove();
    }
    message.classList.add("list-group-item", "d-flex");

    if (action == "try") {
        let resultButton = document.createElement("div");
        resultButton.classList.add("px-2", "rounded", "text-white")
        resultButton.innerText = checkAnswer(correct);

        let result = document.createElement("p");
        result.classList.add("ml-3", "my-0");
        result.innerText = document.querySelector(".answer").value;

        messageContainer.append(message);
        message.append(resultButton);
        message.append(result);
        if (checkAnswer(correct) == "4A0B") {
            resultButton.classList.add("bg-success")
            gameEnd();
        } else {
            resultButton.classList.add("bg-warning")
        }
    } else if (action == "check") {
        message.innerText = `正確解答是:  ${correct}`;
        messageContainer.append(message);
    } else if (action == "wrong") {
        let warning = document.createElement("i")
        warning.classList.add("fas", "fa-exclamation-triangle", "text-danger", "mr-2")
        warning.style.lineHeight = "1.5";
        message.innerText = "輸入格式不正確，請重新輸入";
        messageContainer.append(message);
        message.prepend(warning);
    } else if (action == "end") {

    }

}

function isValid() {
    let answer = document.querySelector(".answer").value.split("");
    let answerSet = new Set(answer);
    let numbers = "1234567890".split("");
    let check = answer.filter((i) => {
        return numbers.indexOf(i) > -1
    })

    if (answerSet.size != 4 || answer.length != 4 || check.length != 4) {
        addMessage("wrong");
        return false;
    }
    return true;
}

function gameEnd() {
    let congratulation = document.createElement('li');
    congratulation.innerText = "你真棒!再來一場吧?";
    congratulation.classList.add("list-group-item", "d-flex");
    document.querySelector('.text-box').append(congratulation);
    let good = document.createElement("i");
        good.classList.add("fas", "fa-thumbs-up", "text-primary", "mr-2")
        good.style.lineHeight = "1.5";
    congratulation.prepend(good);

    btnRestart.style.visibility = "hidden";
    btnCheck.style.visibility = "hidden";
    guessSection.style.visibility = "hidden";
    btnStart.style.visibility = "visible";
}

function removeOldMessage(){
    let oldMessage = document.querySelectorAll('.text-box li');
    for (const i of oldMessage) {
        i.remove();
    }
}