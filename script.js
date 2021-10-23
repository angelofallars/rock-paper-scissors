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


// Simulate a round of Rock Paper Scissors
function playRound(playerSelection, computerSelection) {
  // Split path depending on player's selection (rock, paper, scissors)
  // For each three paths, three more paths depending on computer selection

  // 1 = player win
  // 0 = lose
  // -1 = tie
  let playerWins;

  // Player's selection, capitalized, for the returned string
  let properPlayerSelection;

  switch (playerSelection.toUpperCase()) {
    case 'ROCK':
      properPlayerSelection = 'Rock';

      switch(computerSelection) {
        case 'Rock':
          playerWins = -1;
          break;
        case 'Paper':
          playerWins = 0;
          break;
        case 'Scissors':
          playerWins = 1;
          break;
      }
      break;

    case 'PAPER':
      properPlayerSelection = 'Paper';

      switch(computerSelection) {
        case 'Rock':
          playerWins = 1;
          break;
        case 'Paper':
          playerWins = -1;
          break;
        case 'Scissors':
          playerWins = 0;
          break;
      }
      break;

    case 'SCISSORS':
      properPlayerSelection = 'Scissors';

      switch(computerSelection) {
        case 'Rock':
          playerWins = 0;
          break;
        case 'Paper':
          playerWins = 1;
          break;
        case 'Scissors':
          playerWins = -1;
          break;
      }
      break;
  }


  // Declare winner
  // return either You Win! or You Lose! or Tie!
  if (playerWins === 1) {
    return `You win! ${properPlayerSelection} beats ${computerSelection}!`;
  } else if (playerWins === 0) {
    return `You lose! ${properPlayerSelection} is beaten by ${computerSelection}!`;
  } else {
    return `It's a tie! Both of you chose ${computerSelection}!`;
  }
}


// Simulate 5 rounds of Rock Paper Scissors
function game() {
  let playerSelection;
  let computerSelection;
  let roundResult;
  let playerWins = 0;
  let aiWins = 0;

  console.log("Rock Paper Scissors vs AI! Win 3 rounds out of 5 to win!")

  // Play 5 rounds
  for (let i = 0; i < 5; i++) {
    console.log(`ROUND ${i + 1}`);

    // Get player input. Keep looping as long as the user keeps typing
    // stuff that isn't Rock, Paper or Scissors
    do {
      playerSelection = prompt(`ROUND ${i + 1}: Rock, paper or scissors?`);
    }
    while (!["ROCK", "PAPER", "SCISSORS"].includes(playerSelection.toUpperCase(), 0));

    // Get the computer's selection with a random algorithm
    computerSelection = computerPlay();

    // Simulate a round with each participant's inputs and log the result
    roundResult = playRound(playerSelection, computerSelection);
    console.log(roundResult);

    // Calculate the wins of the round, do nothing on tie
    if (roundResult.includes("You win!")) {
      playerWins++;
    } else if (roundResult.includes("You lose!")) {
      aiWins++;
    }
  }

  // Declare the winner of the entire game
  if (playerWins > aiWins) {
    console.log("🎆 You won the game! 🎆");
  } else if (playerWins < aiWins) {
    console.log("😭 You lost the game! 😭");
  } else {
    console.log("It's a tie!");
  }
}


game();
