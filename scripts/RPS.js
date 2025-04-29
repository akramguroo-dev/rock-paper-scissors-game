let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;

    /* When the game is auto playing, change the text in the button to "Stop Playing" */
    document.querySelector(".js-auto-play-button")
    .innerHTML = "Stop Playing";

  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;

    /* When the game is not playing, change the text in the button back to "Auto Play".*/ 
    document.querySelector(".js-auto-play-button")
        .innerHTML = "Auto Play";
  }
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}

function showResetConfirmationMessage() {
  document.getElementById("confirmation-message")
    .innerHTML = `
      Are you sure you want to reset the score? <button id="yes">Yes</button> <button id="no">No</button>`;
}

function hideResetConfirmationMessage() {
  document.getElementById("confirmation-message")
    .innerHTML = "";
}

// Creating some features with the use of .addEventListener():
document.querySelector(".js-rock-button")
  .addEventListener("click", () => {
    playGame("rock");
  });

document.querySelector(".js-paper-button")
  .addEventListener("click", () => {
    playGame("paper");
  });

document.querySelector(".js-scissors-button")
  .addEventListener("click", () => {
    playGame("scissors");
  });

document.querySelector(".js-reset-score-button")
  .addEventListener("click", () => {
    showResetConfirmationMessage();

    document.getElementById("yes").addEventListener("click", () => {
      resetScore();
      hideResetConfirmationMessage();
    });
    
    document.getElementById("no").addEventListener("click", () => {
      hideResetConfirmationMessage();
    });
  });

document.querySelector(".js-auto-play-button")
  .addEventListener("click", () => {
    autoPlay();
  });

document.body.addEventListener("keydown", (event) => {
  if (event.key === 'a') {
    autoPlay();
  } else if (event.key === 'Backspace') {
    showResetConfirmationMessage();

    document.getElementById("yes").addEventListener("click", () => {
      resetScore();
      hideResetConfirmationMessage();
    });
    
    document.getElementById("no").addEventListener("click", () => {
      hideResetConfirmationMessage();
    });
  } else if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
    
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins++;
  } else if (result === 'You lose.') {
    score.losses++;
  } else if (result === 'Tie.') {
    score.ties++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result')
    .innerHTML = result;
  
  document.querySelector('.js-moves')
    .innerHTML = `You
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;
}

function updateScoreElement() {
  document.querySelector('.js-score')
  .innerHTML = `Wins; ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}