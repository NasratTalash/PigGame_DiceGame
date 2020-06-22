/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let dom = {
  rollBtn: document.querySelector(".btn-roll"),
  newBtn: document.querySelector(".btn-new"),
  holdBtn: document.querySelector(".btn-hold"),
  cancelBtn: document.querySelector(".btn-cancel"),
  settingBtn: document.querySelector(".btn-setting"),
  dice: document.querySelector(".dice"),
  modal: document.querySelector(".modalContainer"),
  acceptBtn: document.querySelector(".btn-accept"),
  winScore: document.querySelector(".winScore"),
  winScoreUI: document.querySelector(".targetScore span"),
  snackBar: document.querySelector(".snackbar"),
  player: [
    {
      roundScore: document.querySelector("#current-0"),
      globalScore: document.querySelector("#score-0"),
      panel: document.querySelector(".player-0-panel"),
      name: document.querySelector("#name-0"),
      customName: document.querySelector(".player-0-name"),
    },
    {
      roundScore: document.querySelector("#current-1"),
      globalScore: document.querySelector("#score-1"),
      panel: document.querySelector(".player-1-panel"),
      name: document.querySelector("#name-1"),
      customName: document.querySelector(".player-1-name"),
    },
  ],
};
let playerScore = [
  {
    roundScore: 0,
    globalScore: 0,
  },
  {
    roundScore: 0,
    globalScore: 0,
  },
];

let currentPlayer;
let winningScore = 100;

// Call the init function
init();
// function to initialize the game
function init() {
  currentPlayer = 0;
  dom.player.forEach((cur) => {
    cur.roundScore.textContent = "0";
    cur.globalScore.textContent = "0";
  });

  dom.dice.style.display = "none";

  dom.player[0].panel.classList.add("active");
  dom.player[1].panel.classList.remove("active");
  dom.player[0].panel.classList.remove("winner");
  dom.player[1].panel.classList.remove("winner");
  dom.player[0].name.textContent = "Player 1";
  dom.player[1].name.textContent = "Player 2";

  dom.holdBtn.removeAttribute("disabled");
  dom.rollBtn.removeAttribute("disabled");
  dom.settingBtn.removeAttribute("disabled");
}

// To generate the random number
function generateRandom() {
  return Math.round(Math.random() * 5) + 1;
}

// add to player's round score
function addRoundScore(score, actPlayer) {
  if (score !== 1) {
    playerScore[actPlayer].roundScore += score;
  } else {
    nextPlayer(actPlayer);
  }
}

// function to change to next player
function nextPlayer(actPlayer) {
  dom.dice.style.display = "none";
  playerScore[actPlayer].roundScore = 0;
  dom.player[actPlayer].roundScore.textContent = "0";
  dom.player[actPlayer].panel.classList.remove("active");
  actPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);
  dom.player[currentPlayer].panel.classList.add("active");
}

// funtion to show the dice number on ui
function showScore(actPlayer, score) {
  dom.player[actPlayer].roundScore.textContent =
    playerScore[actPlayer].roundScore;
  dom.dice.src = "./images/dice-" + score + ".png";
  dom.dice.style.display = "block";
}

// rollDice function to roll the dice
function rollDice() {
  let score = generateRandom();
  addRoundScore(score, currentPlayer);
  if (score !== 1) {
    showScore(currentPlayer, score);
  }
}

function handleHold() {
  let pGlobalScore;
  playerScore[currentPlayer].globalScore +=
    playerScore[currentPlayer].roundScore;
  dom.player[currentPlayer].globalScore.textContent =
    playerScore[currentPlayer].globalScore;
  pGlobalScore = playerScore[currentPlayer].globalScore;
  if (pGlobalScore >= winningScore) {
    dom.player[currentPlayer].panel.classList.add("winner");
    dom.dice.style.display = "none";
    dom.player[currentPlayer].name.textContent = "winner";
    dom.holdBtn.setAttribute("disabled", "");
    dom.rollBtn.setAttribute("disabled", "");
    dom.settingBtn.setAttribute("disabled", "");
  } else {
    nextPlayer(currentPlayer);
  }
}

function startNewGame() {
  // initialize game
  init();
  // Set the scores to zero
  playerScore.forEach((cur) => {
    cur.roundScore = 0;
    cur.globalScore = 0;
  });
  winningScore = 100;
  dom.winScoreUI.textContent = winningScore;
}

// Function to close Modal and cancel input
function closeModal() {
  dom.modal.parentElement.classList.remove("show");
}

// Function to validate the input
function checkInput() {
  let inputWinScore = Number(dom.winScore.value);
  let isWinScoreValid = !isNaN(inputWinScore); // if number is not NaN then result is true
  let isNameValid = true;
  dom.player.forEach((cur) => {
    let isValid = cur.customName.value.length < 20;
    if (!isValid) isNameValid = false; // If any of the names are not valid then names are not valid
  });
  console.log(isWinScoreValid, inputWinScore, dom.winScore.value);
  return isNameValid && isWinScoreValid;
}

// Function to show the error
function showError(text) {
  dom.snackBar.firstElementChild.innerHTML = text;
  dom.snackBar.classList.add("active");
  setTimeout(() => {
    dom.snackBar.classList.remove("active");
  }, 4000);
}
// Function to change win score and players' name
function setInput() {
  if (checkInput()) {
    startNewGame(); // First start a new game then set names and win score
    dom.player.forEach((cur) => {
      if (cur.customName.value) {
        cur.name.textContent = cur.customName.value;
      }
    });
    winningScore = Number(dom.winScore.value);
    dom.winScoreUI.textContent = winningScore;
    closeModal();
  } else {
    showError(
      "Win Score should be a number.<br>Player names should be 1-20 characters."
    );
  }
}

// Function to show the settings
function showSetting() {
  dom.modal.parentElement.classList.add("show");
}
// Event Listener for roll button
dom.rollBtn.addEventListener("click", rollDice);

// Event listener for hold button
dom.holdBtn.addEventListener("click", handleHold);

// Event listener for new game button
dom.newBtn.addEventListener("click", startNewGame);

// Event listener for modal cancel/close button
dom.cancelBtn.addEventListener("click", closeModal);

// Event listener for modal accept button
dom.acceptBtn.addEventListener("click", setInput);

// Event listener for settings button
dom.settingBtn.addEventListener("click", showSetting);
