const play = document.querySelector('#play');
const keyWord = id('play');
let randomWord = "";
const keyBoard = document.querySelectorAll('#keyBoard button');
const newWord = document.querySelector('#newWord');
const inputWord = document.querySelector('#inputWord');
const deleteWord = document.querySelector('#deleteWord');
const lives = 7;
const list = id('list');
const newWordContainer = id("new");
const newGame = id("newGame");
const desist = id("desist");
let fails = 0;
let success = 0;
let neew = "";
const failWords = id("fails");
mainContent = id("mainContent");
const words = [
    "ALURA",
    "DEVELOPER",
    "JAVA",
    "JAVASCRIPT",
    "FUEGO",
    "AGUA"
];
gameOver();

// localStorage.setItem("words", JSON.stringify(words));
// randomWord = JSON.parse(localStorage.getItem("words"));

//list.innerHTML = words;
for (let i = 0; i < words.length; i++) {
    list.innerHTML += words[i] + " - ";
}
newWord.addEventListener("click", createNewWord);
function createNewWord() {
    
        result = inputWord.value.toUpperCase();
        for (let i = 0; i < words.length; i++) {
            if (result !== words[i] && result.length <= 8){
                words.push(result);
                break;
        }}
        console.log(words);
        inputWord.classList.remove('.hidden');
        inputWord.value = "";
        list.innerHTML = "";
        for (let i = 0; i < words.length; i++) {
            list.innerHTML += words[i] + " - ";
        }
    }


deleteWord.addEventListener("click", ()=>{
    for (let i = 0; i < words.length; i++) {
        if (words[i] == inputWord.value.toUpperCase()) {
            words.splice(i, 1);
        }
    }
    inputWord.value = "";
    list.innerHTML = "";
    for (let i = 0; i < words.length; i++) {
        list.innerHTML += words[i] + " - ";
    }
    console.log(words);
});

function newGamme() {
    newGame.disabled = true;
    desist.disabled = false;
    id('buttons').classList.add("hidden");
    mainContent.classList.remove("hidden");
    id('result').innerHTML = "";
    failWords.innerHTML = "";
    for(let i = 0; i < keyBoard.length; i++){
        keyBoard[i].disabled = false;
    }
    fails = 0;
    success = 0;
    play.disabled = true;
    const containerWord = id('secretWord');
    containerWord.innerHTML = "";
    let random = Math.floor(Math.random() * words.length);
    console.log(random);
    randomWord = words[random];
    const amountLetters = randomWord.length;
    const source = `./img/${fails}.png`
        const img = id('img');
        img.src = source;
    console.log(randomWord);
    for (let i = 0; i < amountLetters; i++) {
        const span = document.createElement('span');
        containerWord.appendChild(span);
    }
};

play.addEventListener("click", newGamme);


for (let i = 0; i < keyBoard.length; i++) {
    keyBoard[i].addEventListener('click', clickWord);
}




//functions
function clickWord (){
    const spans = document.querySelectorAll('#secretWord span');
    const button = event.target;
    button.disabled = true;
    const letter = button.innerHTML.toUpperCase();
    const word = randomWord.toUpperCase();
    let win = false;
    for (let i = 0; i < word.length; i++) {
        if (letter == word[i]){
            win = true;
            spans[i].innerHTML = letter;
            success++;
        }
    }
    if (win == false){
        fails++;
        const source = `./img/${fails}.png`
        const img = id('img');
        img.src = source;
        failWords.innerHTML += " " + letter; 
    }

    if (fails == 7){
        gameOver();
        id('result').innerHTML = "Perdiste"
    } else if(success == randomWord.length){
        gameOver();
        id('result').innerHTML = "Ganaste"
    }
}



desist.addEventListener('click', ()=>{
    fails = 7;
    gameOver();
    id('result').innerHTML = "Perdiste"
    desist.disabled = true;
    const source = `./img/${fails}.png`
        const img = id('img');
        img.src = source;
        newGame.disabled = false;
        id('buttons').classList.remove("hidden");
        mainContent.classList.add("hidden");
});
newWordContainer.addEventListener("click", ()=>{
    id("newWords").classList.remove("hidden");
    id('buttons').classList.add("hidden");
});

id("back").addEventListener("click", ()=>{
    id('buttons').classList.remove("hidden");
    id('newWords').classList.add("hidden");
});

function gameOver(){
    for(let i = 0; i < keyBoard.length; i++){
        keyBoard[i].disabled = true;
    }
    fails = 7;
    play.disabled = false;
    newGame.disabled = false;
    desist.disabled = true;
    
}
function id (str){
    return document.getElementById(str);
}
newGame.addEventListener("click", newGamme);