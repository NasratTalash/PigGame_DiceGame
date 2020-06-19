/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let dom = {
  rollBtn: document.querySelector('.btn-roll'),
  newBtn: document.querySelector('.btn-new'),
  holdBtn: document.querySelector('.btn-hold'),
  dice: document.querySelector('.dice'),
  playerOne: {
    roundScore: document.querySelector('#current-0'),
    globalScore: document.querySelector('#score-0'),
    panel: document.querySelector('.player-0-panel'),
  },
  playerTwo: {
    roundScore: document.querySelector('#current-1'),
    globalScore: document.querySelector('#score-1'),
    panel: document.querySelector('.player-1-panel'),
  },
};
let scores = {
  playerOne: {
    roundScore: 0,
    globalScore: 0,
  },
  playerTwo: {
    roundScore: 0,
    globalScore: 0,
  },
};

// Call the init function
init();
// IIFE function to initialize the game 
function init() {
  dom.playerOne.globalScore.textContent = 0;
  dom.playerOne.roundScore.textContent = 0;

  dom.playerTwo.globalScore.textContent = 0;
  dom.playerTwo.roundScore.textContent = 0;

  dom.dice.style.display = 'none';

  dom.playerOne.panel.classList.add('active');
  dom.playerTwo.panel.classList.remove('active');
};
// To generate the random number
function generateRandom() {
  return Math.round((Math.random() * 5) + 1);
}

// add round score
function addRoundScore(score, actPlayer) {
  if(actPlayer === 0) {
    scores.playerOne.roundScore += score;
    if(score === 1) {
      scores.playerOne.roundScore = 0;
    }
  } else if(actPlayer === 1) {
    scores.playerTwo.roundScore += score;
    if(score === 1) {
      scores.playerOne.roundScore = 0;
    }
  }
}

// rollDice function to roll the dice
function rollDice() {
  let score = generateRandom();
  addRoundScore(score, 0);
  showScore(scores.playerOne.roundScore);
}

// funtion to show the dice number on ui
function showScore(number) {
  dom.playerOne.roundScore.textContent = number;
}

// Event Listener for roll button
dom.rollBtn.addEventListener('click', rollDice);