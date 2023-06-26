'use strict';
// SELECT ELEMENTS
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const score0EL = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore, activePlayer, scores, playing;

// THE GAME FUNCTIONALITY
const init = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  diceEl.classList.add('hidden');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  player1.classList.remove('player--active');
  player0.classList.add('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; //already active player
  activePlayer = activePlayer === 0 ? 1 : 0; //switching
  currentScore = 0; // so that not adding score to previous player score
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//ROLLING DICE FUNCTIONALITY
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. generate number when rolling the dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. display the dice number
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. check if dice = 1
    if (dice === 1) {
      // swtich players
      switchPlayer();
    } else {
      // add dice to current score and display it
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

//HOLD BUTTON FUNCTIONALITY
btnHold.addEventListener('click', function () {
  if (playing) {
    // add cuurent score to total score and display it
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 50) {
      // player wins and game finished
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceEl.classList.add('hidden');
      playing = false;
    } else {
      // swtich players
      switchPlayer();
    }
  }
});

//NEW GAME BUTTON FUNCTIONALITY
btnNew.addEventListener('click', init);
