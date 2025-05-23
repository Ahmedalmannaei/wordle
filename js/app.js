document.addEventListener("DOMContentLoaded", () => {
  /*-------------- Constants -------------*/
  const wordsArray = [
    "apple",
    "brick",
    "chair",
    "dance",
    "eagle",
    "flame",
    "grape",
    "heart",
    "input",
    "jelly",
    "knock",
    "light",
    "music",
    "night",
    "ocean",
    "plant",
    "queen",
    "river",
    "stone",
    "table",
    "urban",
    "vivid",
    "water",
    "xenon",
    "yield",
    "zebra",
    "angel",
    "bliss",
    "cloud",
    "dream",
    "earth",
    "frost",
    "glory",
    "happy",
    "ideal",
    "jolly",
    "karma",
    "lemon",
    "magic",
    "noble",
    "optic",
    "pride",
    "quest",
    "right",
    "solar",
    "trend",
    "unity",
    "value",
    "whale",
    "young",
  ];

  /*---------- Variables (state) ---------*/
  let numberOfGuesses = 6;
  let currentGuess = [];
  let correctWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
  let rows = 6;
  let cols = 5;
  let tilesBoard = [];
  let currentRow = 0;
  for (r = 0; r < rows; r++) {
    let row = [];
    for (c = 0; c < cols; c++) {
      const tile = document.getElementById(`${r}-${c}`);
      row.push(tile);
    }
    tilesBoard.push(row);
  }
  let message = "";
  let winner = false;
  /*----- Cached Element References  -----*/
  const boardElm = document.querySelector("#board");
  const tilesElm = document.querySelectorAll(".tile");
  const lettersElm = document.querySelectorAll(".letter");
  const deleteElm = document.querySelector("#delete");
  const enterElm = document.querySelector("#enter");
  const resetElm = document.querySelector("#reset");

  /*-------------- Functions -------------*/
  const init = () => {
    numberOfGuesses = 6;
    currentGuess = [];
    currentRow = 0;
    winner = false;
    correctWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 5; c++) {
        const tile = tilesBoard[r][c];
        tile.textContent = "";
        tile.dataset.state = "";
        tile.classList.remove("flip");
      }
      lettersElm.forEach((Letter) => {
        Letter.dataset.state = "";
      });
    }
    message = "";
    document.getElementById("message").textContent = message;
  };
  const handleLetters = (event) => {
    if (currentGuess.length === 5) {
      return;
    }
    let clickedLetter = event.target.innerText;
    clickedLetter = clickedLetter.toLowerCase();

    currentGuess.push(clickedLetter);
    const tile = tilesBoard[currentRow][currentGuess.length - 1];
    tile.innerHTML = `<span>${clickedLetter.toUpperCase()}</span>`;
  };
  const deleteLetter = () => {
    if (currentGuess.length === 0 || winner === true) return;
    currentGuess.pop();
    const currentTile = tilesBoard[currentRow][currentGuess.length];
    currentTile.textContent = "";
  };
  const getLetter = (letter) => {
    for (const element of lettersElm) {
      if (element.textContent.toLowerCase() === letter.toLowerCase()) {
        return element;
      }
    }
    return null;
  };
  const submitGuess = () => {
    let guessedWord = currentGuess.join("").toLowerCase();
    if (currentGuess.length < 5) {
      message = "Word too short make sure its 5 letters";
      document.getElementById("message").textContent = message;
      return;
    } else if (!wordsArray.includes(guessedWord)) {
      message = "Word not in list try another word";
      document.getElementById("message").textContent = message;
      return;
    } else {
      message = "";
      document.getElementById("message").textContent = message;
      let correctGuess = correctWord.split("");
      for (i = 0; i < 5; i++) {
        let currentTile = tilesBoard[currentRow][i];
        let position = correctGuess.indexOf(currentGuess[i]);
        let letter = getLetter(currentGuess[i]);
        let color = "";
        if (position == -1) {
          color = "gray";
        } else {
          if (currentGuess[i] === correctGuess[i]) {
            color = "green";
            correctGuess[position] = null;
          } else {
            color = "yellow";
          }
        }
        let delay = 250 * i;
        setTimeout(() => {
          currentTile.classList.add("flip");
          currentTile.dataset.state = color;
          if (letter) {
            const currentState = letter.dataset.state;
            if (
              !currentState ||
              (currentState === "gray" && color !== "gray") ||
              (currentState === "yellow" && color === "green")
            ) {
              letter.dataset.state = color;
            }
          }
        }, delay);
      }
    }

    if (currentGuess.join("").toLowerCase() === correctWord) {
      message = `Congratulations you guessed the right word with ${
        numberOfGuesses - 1
      } guesses remaining`;
      document.getElementById("message").textContent = message;
      winner = true;
      numberOfGuesses = 0;
    } else {
      numberOfGuesses--;
      currentGuess = [];
      currentRow++;
    }
    if (numberOfGuesses === 0 && currentGuess.join("") != correctWord) {
      message = `You ran out of guesses. You lose correct word was ${correctWord}`;
      document.getElementById("message").textContent = message;
    }
  };
  const reset = () => {
    init();
  };
  init();
  /*----------- Event Listeners ----------*/
  lettersElm.forEach((letter, i) => {
    lettersElm[i].addEventListener("click", handleLetters);
  });
  deleteElm.addEventListener("click", deleteLetter);
  enterElm.addEventListener("click", submitGuess);

  document.getElementById("how-to-play").addEventListener("click", () => {
    document.getElementById("instructions").classList.remove("hidden");
  });

  document
    .getElementById("close-instructions")
    .addEventListener("click", () => {
      document.getElementById("instructions").classList.add("hidden");
    });
  resetElm.addEventListener("click", reset);
});
