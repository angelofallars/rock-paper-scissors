// Get the move of the computer
function computerPlay () {
  let computerTurn = Math.floor(Math.random() * 3);

  switch (computerTurn) {
    case (0):
      return 'Rock';
    case (1):
      return 'Paper';
    case (2):
      return 'Scissors';
  }
}

function toCapitalCase(string) {
  const firstLetter = string.slice(0, 1).toUpperCase();
  const otherLetters = string.slice(1).toLowerCase();

  return firstLetter + otherLetters;
}

// Simulate a round of Rock Paper Scissors
function playRound(playerSelection, computerSelection) {
  // Split path depending on player's selection (rock, paper, scissors)
  // For each three paths, three more paths depending on computer selection

  // 1 = player win
  // 0 = tie
  // -1 = AI win
  let playerWins;

  switch (playerSelection.toUpperCase()) {
    case 'ROCK':
      switch(computerSelection) {
        case 'Rock':
          playerWins = 0;
          break;
        case 'Paper':
          playerWins = -1;
          break;
        case 'Scissors':
          playerWins = 1;
          break;
      }
      break;

    case 'PAPER':
      switch(computerSelection) {
        case 'Rock':
          playerWins = 1;
          break;
        case 'Paper':
          playerWins = 0;
          break;
        case 'Scissors':
          playerWins = -1;
          break;
      }
      break;

    case 'SCISSORS':
      switch(computerSelection) {
        case 'Rock':
          playerWins = -1;
          break;
        case 'Paper':
          playerWins = 1;
          break;
        case 'Scissors':
          playerWins = 0;
          break;
      }
      break;
  }


  // Declare winner
  return playerWins;
}

function finishAnimationEnd(element, animationClass) {
  element.addEventListener("animationend", (e) => {
    if (e.target.classList.contains(animationClass)) {
      e.target.classList.remove(animationClass);
    }
  })
}

const buttons = document.querySelectorAll(".buttons > button");
const playerScoreText = document.querySelector(".score__number.player");
const aiScoreText = document.querySelector(".score__number.ai");
const roundResultText = document.querySelector(".round-result");
const winner = document.querySelector(".winner");

playerScoreText.textContent = '0';
aiScoreText.textContent = '0';

let playerScore = 0;
let aiScore = 0;

// Remove the animation class for the increment animations on the score texts
finishAnimationEnd(playerScoreText, "score__number--bang");
finishAnimationEnd(aiScoreText, "score__number--bang");


function makePlayerMove (e) {
    const playerMove = toCapitalCase(e.target.getAttribute('id'));
    const aiMove = computerPlay();

    const roundResult = playRound(playerMove, aiMove);

    switch (roundResult) {
      case (1):
        playerScore++;
        playerScoreText.textContent = playerScore;
        playerScoreText.classList.add("score__number--bang");
        roundResultText.textContent = `You won this round! ${playerMove} wins against ${aiMove}!`;
        break;

      case (-1):
        aiScore++;
        aiScoreText.textContent = aiScore;
        aiScoreText.classList.add("score__number--bang");
        roundResultText.textContent = `You lost this round! ${aiMove} wins against ${playerMove}!`;
        break;

      case (0):
        roundResultText.textContent = `Tie! You both chose ${aiMove}!`;
        break;
    }

    if (playerScore >= 5) {
      winner.textContent = "You win!";
      winner.classList.add("show");
      winner.classList.add("cyan");
      endGame();
    } else if (aiScore >= 5) {
      winner.textContent = "You lost!";
      winner.classList.add("show");
      winner.classList.add("gray");
      endGame();
    }
}

function endGame() {
  buttons.forEach((button) => {
    button.classList.add("inactive");
    button.removeEventListener("click", makePlayerMove);
    button.removeEventListener("click", animateClickButton);
  })
}

function animateClickButton(e) {
  e.target.classList.add("button--click");
}

buttons.forEach((button) => {
  button.addEventListener("click", makePlayerMove); 

  // Add that clicky clack animation when you click on the button
  button.addEventListener("click", animateClickButton);

  finishAnimationEnd(button, "button--click");
});
