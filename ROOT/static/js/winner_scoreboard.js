// winner_scoreboard.js

function determineWinner(playerChoice, computerSelectedHand) {
    const winningHands = {
      rock: ["scissors", "lizard"],
      paper: ["rock", "spock"],
      scissors: ["paper", "lizard"],
      lizard: ["paper", "spock"],
      spock: ["scissors", "rock"],
    };

    if (winningHands[playerChoice].includes(computerSelectedHand)) {
      return {
        winner: "Player",
        description: `${playerChoice} beats ${computerSelectedHand}`,
      };
    } else if (winningHands[computerSelectedHand].includes(playerChoice)) {
      return {
        winner: "Computer",
        description: `${computerSelectedHand} beats ${playerChoice}`,
      };
    } else {
      return { winner: "Draw", description: "It's a draw!" };
    }
  }

  function updateScore(winner) {
    if (winner === "Player") {
      playerScore++;
    } else if (winner === "Computer") {
      computerScore++;
    }
    // Log the winner or draw right before updating the score
    console.log(`Round ${round} Winner: ${winner}`);
    updateScoresDisplay();
  }

  function announceRoundWinner(playerChoice, computerSelectedHand) {
    const { winner, description } = determineWinner(
      playerChoice,
      computerSelectedHand
    );
    displayRoundResult(description, winner);
  }

  function displayRoundResult(description, winner) {
    let roundResultElement = document.getElementById("roundResult");
    let roundNumberElement = document.getElementById("roundNumber");
    roundNumberElement.style.display = "none"; // Immediately hide the round number

    roundResultElement.textContent = description; // Display the round result

    setTimeout(() => {
      if (winner !== "Draw") {
        roundResultElement.textContent = `ROUND WINNER: ${winner}`;
      } else {
        roundResultElement.textContent = description; // Keeps showing "It's a draw!"
      }

      updateScore(winner); // Update the score after announcing the winner

      setTimeout(() => {
        round = round + 1;
        roundResultElement.textContent =
          round > totalRounds ? "" : "ROUND " + round; // Clear the result after some time, preparing for next actions
        document.getElementById("playerHandImage").src =
          "Images/pstatushand.png";
        document.getElementById("computerHandImage").src =
          "Images/cstatushand.png";
        // Select all the icon elements within the "icons-row" div
        const icons = document.querySelectorAll(".icons-row .icon");
        // Remove "selected" class from all icons
        icons.forEach((icon) => icon.classList.remove("selected"));
        // Set all icons to their default background image
        icons.forEach(
          (icon) =>
            (icon.style.backgroundImage = `url("${icon.dataset.default}")`)
        );
        if (round <= totalRounds) {
          // Changed to include the last round
          // If not last round, play next round
          playNextRound();
        } else {
          // If last round, end game
          endGame();
        }
      }, 2000); // Adjust this timeout as needed
    }, 2000); // Adjust this delay based on your animation or desired timing
  }

  function updateScoresDisplay() {
    document.querySelector(".player-score-box").textContent = playerScore;
    document.querySelector(".computer-score-box").textContent =
      computerScore;
  }

  function playGame(playerChoice, computerSelectedHand) {
    announceRoundWinner(playerChoice, computerSelectedHand);
  }