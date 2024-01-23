var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const sectionCards = document.querySelector("#section-cards");
const timer = document.querySelector("#timer");
const countMoves = document.querySelector("#moves");
const btnRestart = document.querySelector("#repeat");
const divWin = document.querySelector("#win");
const divGameOver = document.querySelector("#game-over");
const btnPlayAgain = document.querySelectorAll("#play-again");
const spanTimerWin = document.querySelector("#win-timer");
const spanMovesWin = document.querySelector("#win-moves");
const liTop3 = document.querySelectorAll("#top3");
const classes = ["select", "different", "matching", "spin", "animate__flipInY", "animate__flipOutY", "animate__animated"];
let btnCards;
let cardsRandom = [];
let compareCards = [];
let moves = 0;
let meuInterval;
function fetchCards() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("https://raw.githubusercontent.com/Joao123433/json-data/main/memoryGame.json");
        return response.json();
    });
}
function createDiv() {
    const div = document.createElement("div");
    return div;
}
function createBtn(cardElement) {
    const button = document.createElement("button");
    button.id = "btn-card";
    button.innerHTML = cardElement.card;
    button.setAttribute("data-name", cardElement.name);
    button.addEventListener("click", cardOpen);
    return button;
}
function renderCards(card) {
    const div = createDiv();
    div.id = "card";
    const btn = createBtn(card[0]);
    div.append(btn);
    sectionCards.append(div);
}
function getCards() {
    return __awaiter(this, void 0, void 0, function* () {
        const cards = yield fetchCards();
        sortCards(cards.cards);
        cardsRandom.forEach(c => renderCards(c));
        btnCards = [...document.querySelectorAll("button[id='btn-card']")];
    });
}
function sortCards(cards) {
    for (let i = 0; i < 16; i++) {
        cardsRandom.push(cards.splice(Math.floor(Math.random() * cards.length), 1));
    }
}
function addAnimateFlip(element) {
    element.classList.add("animate__animated", "animate__flipInY");
}
function cardOpen() {
    this.removeEventListener("click", cardOpen);
    this.classList.add("select");
    compareCards.push(this);
    setMoves();
    addAnimateFlip(this);
    changeImg(this);
    if (compareCards.length === 2) {
        removeClick(btnCards);
        if (compareCards[0].dataset.name === compareCards[1].dataset.name) {
            matchingCards();
        }
        else {
            differentCards();
        }
    }
}
function removeClick(elementCard) {
    elementCard.forEach(e => e.removeEventListener("click", cardOpen));
}
function addClick() {
    btnCards.forEach(e => e.addEventListener("click", cardOpen));
}
function setMoves() {
    moves++;
    countMoves.textContent = `${moves} movimentos`;
    if (moves === 1) {
        starTimer();
    }
    else if (moves === 64) {
        gameOver();
    }
}
function starTimer() {
    let segundos = 0;
    let minutos = 0;
    meuInterval = setInterval(() => {
        let setSeg;
        let setMin;
        segundos++;
        if (segundos > 59) {
            minutos++;
            segundos = 0;
        }
        if (segundos < 10) {
            setSeg = `0${segundos}`;
        }
        else {
            setSeg = segundos;
        }
        if (minutos < 10) {
            setMin = `0${minutos}`;
        }
        else {
            setMin = minutos;
        }
        if (minutos === 2) {
            gameOver();
        }
        timer.textContent = `${setMin}:${setSeg}s`;
    }, 1000);
}
function gameOver() {
    clearInterval(meuInterval);
    divGameOver.classList.add("show");
}
function win() {
    divWin.classList.add("show");
    const currentMoves = document.querySelector("#moves").innerText;
    const currentTimer = document.querySelector("#timer").innerText;
    clearInterval(meuInterval);
    saveLocalStorage(currentMoves, currentTimer);
    renderInfoWin(currentMoves, currentTimer);
    top3();
}
function top3() {
    const datas = localStorage;
    const arrTop3 = [];
    for (const chave in datas) {
        if (datas.hasOwnProperty(chave)) {
            arrTop3.push(datas.getItem(chave));
        }
    }
    arrTop3.sort((a, b) => a.split(" ")[0] - b.split(" ")[0]).slice(0, 3);
    renderTop3(arrTop3);
}
function renderTop3(top3) {
    var _a;
    for (let i = 0; i < liTop3.length; i++) {
        liTop3[i].textContent = (_a = top3[i]) !== null && _a !== void 0 ? _a : "Jogue Mais Vezes";
    }
}
function saveLocalStorage(moves, timer) {
    const id = moves.split(" ")[0];
    const element = `${moves} | ${timer}`;
    localStorage.setItem(id, element);
}
function renderInfoWin(moves, timer) {
    spanMovesWin.innerText = moves;
    spanTimerWin.innerText = timer;
}
function removeBackground() {
    compareCards[0].style.backgroundImage = 'none';
    compareCards[1].style.backgroundImage = 'none';
}
function addBackground() {
    compareCards[0].style.backgroundImage = "url('https://static.vecteezy.com/system/resources/previews/007/126/739/non_2x/question-mark-icon-free-vector.jpg')";
    compareCards[1].style.backgroundImage = "url('https://static.vecteezy.com/system/resources/previews/007/126/739/non_2x/question-mark-icon-free-vector.jpg')";
}
function changeImg(card) {
    card.children[0].style.opacity = 1;
    removeBackground();
}
function removeAllClasses() {
    classes.forEach(c => {
        compareCards[0].classList.remove(c);
        compareCards[1].classList.remove(c);
    });
}
function addClasses(styleclass) {
    compareCards[0].classList.add(styleclass);
    compareCards[1].classList.add(styleclass);
}
function removeCardArray(element) {
    const index = btnCards.indexOf(element);
    btnCards.splice(index, 1);
}
function matchingCards() {
    removeClick(compareCards);
    compareCards.forEach((e) => removeCardArray(e));
    removeAllClasses();
    addClasses("matching");
    addClick();
    compareCards = [];
    if (btnCards.length === 0) {
        win();
    }
}
function differentCards() {
    addClasses("different");
    setTimeout(() => {
        compareCards[0].classList.add("animate__animated", "animate__flipOutY");
        compareCards[1].classList.add("animate__animated", "animate__flipOutY");
    }, 500);
    setTimeout(() => {
        compareCards[0].children[0].style.opacity = 0;
        compareCards[1].children[0].style.opacity = 0;
        addBackground();
        removeAllClasses();
        addClick();
        compareCards = [];
    }, 1100);
}
function restart() {
    zeringValues();
    this.classList.remove("spin");
    setTimeout(() => this.classList.add("spin"), 1);
}
function playAgain() {
    zeringValues();
    divWin.classList.remove("show");
    divGameOver.classList.remove("show");
}
function zeroTimerAndMoves() {
    moves = 0;
    clearInterval(meuInterval);
    timer.textContent = "00:00s";
    countMoves.textContent = `${moves} movimentos`;
}
function zeringValues() {
    document.querySelectorAll("div[id='card']").forEach(e => e.remove());
    zeroTimerAndMoves();
    getCards();
    cardsRandom = [];
    compareCards = [];
}
btnRestart.addEventListener("click", restart);
document.addEventListener("DOMContentLoaded", getCards);
btnPlayAgain.forEach(b => b.addEventListener("click", playAgain));
