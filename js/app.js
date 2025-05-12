/*-------------- Constants -------------*/
const wordsArray =["crane", "flame", "brick", "spine", "grape", "apple", "chair", "plant", "sugar", "globe"];

/*---------- Variables (state) ---------*/
let numberOfGuesses = 6;
let currentGuess = [];
let correctWord = wordsArray[Math.floor(Math.random()*wordsArray.length)]
/*----- Cached Element References  -----*/
const boardElm = document.querySelector('#board');
const tilesElm = document.querySelectorAll('.tile');
const lettersElm = document.querySelectorAll('.letter');
const deleteElm = document.querySelector('#delete');
const enterElm = document.querySelector('#enter');

/*-------------- Functions -------------*/
// const init = ()=>{
//     numberOfGuesses = 6;
//     currentGuess = [];
//     render();
// }
// const render = ()=>{

// }
const handleLetters = (event)=>{
if(currentGuess.length ===5){
    return
}
let clickedLetter = event.target.innerText;
clickedLetter=clickedLetter.toLowerCase();
currentGuess.push(clickedLetter);
console.log(currentGuess);
}
const deleteLetter = ()=>{
    currentGuess.pop();
}
const submitGuess = ()=>{
    if(currentGuess.length<5 || numberOfGuesses===0){
        alert("Invalid guess");
        return
    }
}


/*----------- Event Listeners ----------*/
lettersElm.forEach((letter,i)=>{
    lettersElm[i].addEventListener("click",handleLetters)
});
deleteElm.addEventListener("click",deleteLetter);
enterElm.addEventListener("click",submitGuess);


