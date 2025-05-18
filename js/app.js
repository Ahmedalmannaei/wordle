/*-------------- Constants -------------*/
const wordsArray =["crane", "flame", "brick", "spine", "grape", "apple", "chair", "plant", "sugar", "globe"];

/*---------- Variables (state) ---------*/
let numberOfGuesses = 6;
let currentGuess = [];
let correctWord = wordsArray[Math.floor(Math.random()*wordsArray.length)]
console.log(correctWord);
let rows = 6
let cols= 5
let tilesBoard = [];
let currentRow=0;
for(r=0;r<rows;r++){
  let row = [];
  for(c=0;c<cols;c++){
    const tile=document.getElementById(`${r}-${c}`);
    row.push(tile)
  }
  tilesBoard.push(row)
}

/*----- Cached Element References  -----*/
const boardElm = document.querySelector('#board');
const tilesElm = document.querySelectorAll('.tile');
const lettersElm = document.querySelectorAll('.letter');
const deleteElm = document.querySelector('#delete');
const enterElm = document.querySelector('#enter');
const resetElm = document.querySelector('#reset');

/*-------------- Functions -------------*/
const init = ()=>{
    numberOfGuesses = 6;
    currentGuess = [];
    currentRow=0;
    correctWord = wordsArray[Math.floor(Math.random()*wordsArray.length)]
    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 5; c++) {
          const tile = tilesBoard[r][c];
          tile.textContent = '';
          tile.dataset.state = ''; // remove green/yellow/gray styling
        }
      }

}
const handleLetters = (event)=>{
if(currentGuess.length ===5){
    return
}
let clickedLetter = event.target.innerText;
clickedLetter=clickedLetter.toLowerCase();

currentGuess.push(clickedLetter);
const tile = tilesBoard[currentRow][currentGuess.length - 1];
  tile.textContent = clickedLetter.toUpperCase();
console.log(currentGuess);
}
const deleteLetter = ()=>{
    if (currentGuess.length === 0) return;
    currentGuess.pop();
    const currentTile = tilesBoard[currentRow][currentGuess.length];
  currentTile.textContent = '';
 
}
const submitGuess = ()=>{
    if(currentGuess.length<5){
        return
    }
    else{
        let correctGuess = correctWord.split("");
    for(i=0;i<5;i++){
        let currentTile = tilesBoard[currentRow][i];
        let position = correctGuess.indexOf(currentGuess[i]);
        let color = '';
        let letter = currentGuess[i];
        if(position==-1){
            color = 'gray';
        }
        else{
            if(currentGuess[i]===correctGuess[i]){
                color='green';
                correctGuess[position] = null;  

            }
            else{
                color='yellow';
                correctGuess[position] = null; 

            }
        }
        correctGuess[position]='$';
        let delay = 250*i;
    setTimeout(() => {
        currentTile.dataset.state = color; 
      }, delay);
    
    }
    }
    
    if(currentGuess.join("").toLowerCase()===correctWord){
        
        numberOfGuesses = 0;
    }
    else{
        numberOfGuesses--;
        currentGuess=[];
        currentRow++;
    }
    if(numberOfGuesses===0){
       
    }
}
const reset = ()=>{
    init();
}
init();


/*----------- Event Listeners ----------*/
lettersElm.forEach((letter,i)=>{
    lettersElm[i].addEventListener("click",handleLetters)
});
deleteElm.addEventListener("click",deleteLetter);
enterElm.addEventListener("click",submitGuess);

document.getElementById("how-to-play").addEventListener("click", () => {
    document.getElementById("instructions").classList.remove("hidden");
  });
  
  document.getElementById("close-instructions").addEventListener("click", () => {
    document.getElementById("instructions").classList.add("hidden");
  });
resetElm.addEventListener("click",reset)
