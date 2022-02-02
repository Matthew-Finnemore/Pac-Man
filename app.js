document.addEventListener("DOMContentLoaded", () => {
  //                                 //
  // Initialise all of the variables //
  //                                 //
  const welcomePage = document.getElementById("start-page");
  const startGameBtn = document.getElementById("start-game-btn");
  const scoreDisplay = document.getElementById("score");
  const questionPanel = document.getElementById("questionPanel");
  const numberOne = document.getElementById("numberOne");
  const numberTwo = document.getElementById("numberTwo");
  const operator = document.getElementById("operator");
  const submitButton = document.getElementById("submit");
  const questions = document.getElementById("question");
  const powerUpDiv = document.getElementById("power-up-div");
  let powerups = document.querySelectorAll(".power-up");
  let powerUpEndTimeSlowGhost = document.getElementById("end-time-ghost-slow");
  let powerUpTimer = document.getElementById("time-left-slow");
  let deleteGhostTimer = document.getElementById("time-left-ghost");
  let ghostReturnTimer = document.getElementById("ghost-return-timer");
  let scaredGhostsP = document.getElementById("time-left-scared");
  let scaredGhostTime = document.getElementById("end-time-ghost-scared");
  let wrongAnswerDiv = document.getElementById("wrong-answer");
  let pacManDirection = "pac-man-right";
  let numberofDots = 0;
  const width = 28;
  let score = 0;
  const squares = [];
  const grid = document.querySelector(".game-grid");
  let pacmanCurrentIndex = 490; //starting index
  let qOneAnswered = false;
  let qTwoAnswered = false;
  let qThreeAnswered = false;
  let qFourAnswered = false;
  let qFiveAnswered = false;
  let answer;
  let answeringQuestion = false;
  const operatorChoice = ["x", "-", "+", "÷"];
  let countDown;
  let speedChange;
  let slowGhostTimerPaused = false;
  let removedGhosts = [];
  let scareTimer;
  let secondsTimer;

  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty
  const layout1 = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0,
    1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0,
    1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1,
    1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2,
    2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1,
    2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1,
    0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
    0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];

  let chosenLayout = layout1;
  createBoard();

  scoreDisplay.innerText = `${score}`;
  startGameBtn.addEventListener("click", startGame);
  document.addEventListener("keyup", movePacman);
  submitButton.addEventListener("click", submit);

  //Start the Game on click of the start button
  function startGame() {
    welcomePage.classList.add("none");
    //draw my ghosts onto the grid
    ghosts.forEach((ghost) => {
      squares[ghost.currentIndex].classList.add(ghost.className);
      squares[ghost.currentIndex].classList.add("ghost");
    });

    //move the Ghosts randomly
    ghosts.forEach((ghost) => moveGhost(ghost));
  }

  //create your board
  function createBoard() {
    for (let i = 0; i < chosenLayout.length; i++) {
      const square = document.createElement("div");
      grid.appendChild(square);
      squares.push(square);
      squares[i].classList.add(i);

      //add layout to the board
      if (chosenLayout[i] === 0) {
        squares[i].classList.add("pac-dot");
        numberofDots++;
      } else if (chosenLayout[i] === 1) {
        squares[i].classList.add("wall");
      } else if (chosenLayout[i] === 2) {
        squares[i].classList.add("ghost-lair");
      } else if (chosenLayout[i] === 3) {
        squares[i].classList.add("power-pellet");
      }
    }
  }

  squares[pacmanCurrentIndex].classList.add("pac-man");

  function movePacman(e) {
    if (answeringQuestion === false) {
      squares[pacmanCurrentIndex].classList.remove(
        "pac-man",
        "pac-man-up",
        "pac-man-right",
        "pac-man-left",
        "pac-man-down"
      );
      switch (e.keyCode) {
        case 37: //left
          if (
            pacmanCurrentIndex % width !== 0 &&
            !squares[pacmanCurrentIndex - 1].classList.contains("wall") &&
            !squares[pacmanCurrentIndex - 1].classList.contains("ghost-lair")
          )
            pacmanCurrentIndex -= 1;
          pacManDirection = "pac-man-left";
          if (squares[pacmanCurrentIndex - 1] === squares[363]) {
            pacmanCurrentIndex = 391;
          }
          break;
        case 38: //up
          if (
            pacmanCurrentIndex - width >= 0 &&
            !squares[pacmanCurrentIndex - width].classList.contains("wall") &&
            !squares[pacmanCurrentIndex - width].classList.contains(
              "ghost-lair"
            )
          )
            pacmanCurrentIndex -= width;
          pacManDirection = "pac-man-up";
          break;
        case 39: //right
          if (
            pacmanCurrentIndex % width < width - 1 &&
            !squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
            !squares[pacmanCurrentIndex + 1].classList.contains("ghost-lair")
          )
            pacmanCurrentIndex += 1;
          pacManDirection = "pac-man-right";
          if (squares[pacmanCurrentIndex + 1] === squares[392]) {
            pacmanCurrentIndex = 364;
          }
          break;
        case 40: //down
          if (
            pacmanCurrentIndex + width < width * width &&
            !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
            !squares[pacmanCurrentIndex + width].classList.contains(
              "ghost-lair"
            )
          )
            pacmanCurrentIndex += width;
          pacManDirection = "pac-man-down";
          break;
      }
      squares[pacmanCurrentIndex].classList.remove(
        "pac-man-left",
        "pac-man-right",
        "pac-man-up",
        "pac-man-down"
      );
      squares[pacmanCurrentIndex].classList.add("pac-man");
      squares[pacmanCurrentIndex].classList.add(pacManDirection);
      if (squares[pacmanCurrentIndex].classList.contains("ghost")) {
        eatenScaredGhost();
      }
      pacDotEaten();
      eatenScaredGhost();
      powerPelletEaten();
      checkForGameOver();
      checkForWin();
      checkForQuestion();
    }
  }
  // Show the Question Panel and generate Question
  // currently capped at five questions, woudl like to look at a way
  // to make this unlimited, maybe array....

  function checkForQuestion() {
    switch (true) {
      case score >= 150 && qOneAnswered === false:
        makeQuestion();
        qOneAnswered = true;
        break;
      case score >= 300 && qTwoAnswered === false:
        makeQuestion();
        qTwoAnswered = true;
        break;
      case score >= 450 && qThreeAnswered === false:
        makeQuestion();
        qThreeAnswered = true;
        break;
      case score >= 600 && qFourAnswered === false:
        makeQuestion();
        qFourAnswered = true;
        break;
      case score >= 750 && qFiveAnswered === false:
        makeQuestion();
        qFiveAnswered = true;
        break;
    }
  }
  // submit answer to the randomly generated question
  function submit() {
    let answerInput = document.querySelector("input");
    if (answeringQuestion === true) {
      answeringQuestion = false;
    }

    if (answerInput.value.toString() === answer.toString()) {
      wrongAnswerDiv.classList.add("none");
      questions.classList.add("none");
      powerUpDiv.classList.remove("none");
      answerInput.value = "";
      for (let powerup of powerups) {
        powerup.classList.remove("none");
      }
    } else {
      wrongAnswerDiv.classList.remove("none");
    }
  }

  // what happens when you eat a pac-dot
  function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
      score++;
      numberofDots--;
      scoreDisplay.textContent = score;
      squares[pacmanCurrentIndex].classList.remove("pac-dot");
    }
  }

  //what happens when you eat a power-pellet
  function powerPelletEaten() {
    if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
      score += 10;
      scoreDisplay.textContent = score;
      ghosts.forEach((ghost) => (ghost.isScared = true));

      if (scareTimer != null) {
        clearTimeout(scareTimer);
        scareTimer = setTimeout(unScareGhosts, 20000);
        scaredGhostTimer();
      } else {
        scareTimer = setTimeout(unScareGhosts, 20000);
        scaredGhostTimer();
      }
      squares[pacmanCurrentIndex].classList.remove("power-pellet");
    }
  }

  //make the ghosts stop flashing
  function unScareGhosts() {
    ghosts.forEach((ghost) => (ghost.isScared = false));
  }

  //create ghosts using Constructors
  class Ghost {
    constructor(className, startIndex, speed) {
      this.className = className;
      this.startIndex = startIndex;
      this.speed = speed;
      this.currentIndex = startIndex;
      this.isScared = false;
      this.timerId = NaN;
    }
  }

  //all my ghosts
  let ghosts = [
    new Ghost("blinky", 348, 500),
    new Ghost("pinky", 376, 350),
    new Ghost("inky", 351, 320),
    new Ghost("clyde", 379, 340),
  ];

  function moveGhost(ghost) {
    const directions = [-1, +1, width, -width];
    let direction = directions[Math.floor(Math.random() * directions.length)];

    ghost.timerId = setInterval(function () {
      //if the next squre your ghost is going to go to does not have a ghost and does not have a wall
      if (ghost.currentIndex === 294) {
        direction = +1; // help escaping the box
      }
      if (ghost.currentIndex === 293) {
        direction = -1;
      }
      if (
        ghost.currentIndex === 349 ||
        ghost.currentIndex === 377 ||
        ghost.currentIndex === 405 || // Help Escaping the box
        ghost.currentIndex === 322 ||
        ghost.currentIndex === 321 ||
        ghost.currentIndex === 406 ||
        ghost.currentIndex === 378 ||
        ghost.currentIndex === 350
      ) {
        direction = -width;
      }
      if (
        !squares[ghost.currentIndex + direction].classList.contains("ghost") &&
        !squares[ghost.currentIndex + direction].classList.contains("wall")
      ) {
        //remove the ghosts classes
        squares[ghost.currentIndex].classList.remove(ghost.className);
        squares[ghost.currentIndex].classList.remove(
          "ghost",
          "scared-ghost",
          "pac-man-right"
        );
        //move into that space
        ghost.currentIndex += direction;
        squares[ghost.currentIndex].classList.add(
          ghost.className,
          "ghost",
          "pac-man-right"
        );
        if (
          ghost.isScared &&
          squares[ghost.currentIndex].classList.contains("pac-man")
        ) {
          squares[ghost.currentIndex].classList.remove(
            ghost.className,
            "ghost",
            "scared-ghost",
            "pac-man-right"
          );
          ghost.currentIndex = ghost.startIndex;
          score += 100;
          // @ts-ignore
          scoreDisplay.textContent = score;
          squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
        }
        //else find a new random direction ot go in
      } else direction = directions[Math.floor(Math.random() * directions.length)];

      //if the ghost is currently scared
      if (ghost.isScared) {
        squares[ghost.currentIndex].classList.add("scared-ghost");
      }

      //if the ghost is currently scared and pacman is on it
      if (
        ghost.isScared &&
        squares[ghost.currentIndex].classList.contains("pac-man")
      ) {
        squares[ghost.currentIndex].classList.remove(
          ghost.className,
          "ghost",
          "scared-ghost"
        );
        ghost.currentIndex = ghost.startIndex;
        score += 100;
        // @ts-ignore
        scoreDisplay.textContent = score;
        squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
      }
      checkForGameOver();
    }, ghost.speed); //made variable to allow for powerup
  }

  //check for a game over
  function checkForGameOver() {
    if (
      squares[pacmanCurrentIndex].classList.contains("ghost") &&
      !squares[pacmanCurrentIndex].classList.contains("scared-ghost")
    ) {
      ghosts.forEach((ghost) => {
        squares[ghost.currentIndex].classList.remove(
          ghost.className,
          "ghost",
          "scared-ghost",
          "pac-man-right"
        );
        clearInterval(ghost.timerId);
      });
      document.removeEventListener("keyup", movePacman);
      //                                 //
      // Commit stats to local storage   //
      //                                 //
      localStorage.setItem("gameOver", "lost");
      localStorage.setItem("score", score);
      if (
        score > localStorage.getItem("highScore") ||
        localStorage.getItem("highScore" === null)
      ) {
        localStorage.setItem("highScore", score); // make a new highscore if true, or the first game.
      }
      location.href = "gameover.html";
    }
  }

  //check for a win - more is when this score is reached
  function checkForWin() {
    if (numberofDots === 0) {
      ghosts.forEach((ghost) => clearInterval(ghost.timerId));
      document.removeEventListener("keyup", movePacman);
      localStorage.setItem("score", score);
      localStorage.setItem("gameOver", "won");
      if (
        score > localStorage.getItem("highScore") ||
        localStorage.getItem("highScore" === null)
      ) {
        localStorage.setItem("highScore", score);
      }
      location.href = "gameover.html";
    }
  }
  // if Scared ghost is in the square after key up
  function eatenScaredGhost() {
    ghosts.forEach((ghost) => {
      if (ghost.currentIndex === pacmanCurrentIndex && ghost.isScared) {
        squares[ghost.currentIndex].classList.remove(
          ghost.className,
          "ghost",
          "scared-ghost"
        );
        ghost.currentIndex = ghost.startIndex;
        score += 100;
        scoreDisplay.textContent = score;
        squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
      }
    });
  }

  //                                 //
  // Make a random question function //
  //                                 //
  function makeQuestion() {
    answeringQuestion = true;
    slowGhostTimerPaused = true;
    questionPanel.classList.remove("none");
    questions.classList.remove("none");
    document.getElementById("answer").focus();
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    let firstValue = Math.floor(Math.random() * 10 + 1);
    let secondValue = Math.floor(Math.random() * 10 + 1);
    let operatorRandom =
      operatorChoice[Math.floor(Math.random() * operatorChoice.length)];
    if (operatorRandom === "÷" && firstValue % secondValue != 0) {
      //check to see if the values can be divided euqally when the divide operator is chosen
      operatorRandom =
        operatorChoice[Math.floor(Math.random() * (operatorChoice.length - 1))]; // changes operator if the divisoin has a remainder
    }
    if (operatorRandom === "-" && firstValue < secondValue) {
      //checking for a negative answer
      [firstValue, secondValue] = [secondValue, firstValue]; //swapping values if true
    }
    operator.innerHTML = operatorRandom;
    numberOne.innerHTML = firstValue.toString();
    numberTwo.innerHTML = secondValue.toString();
    switch (operatorRandom) {
      case "x":
        answer = firstValue * secondValue;
        break;
      case "-":
        answer = firstValue - secondValue;
        break;
      case "+":
        answer = firstValue + secondValue;
        break;
      case "÷":
        answer = firstValue / secondValue;
        break;
    }
    return answer;
  }
  //                                 //
  // powerup event listeners         //
  //                                 //
  document.getElementById("slow-ghosts").addEventListener("click", slowGhosts);
  document
    .getElementById("delete-ghost")
    .addEventListener("click", deleteGhost);
  //                                                           //
  // Slow Ghost function, changing ghost interval timer speed. //
  //                                                           //

  function slowGhosts() {
    slowGhostTimerPaused = false;
    clearTimeout(speedChange);
    slowGhostTimer(20);
    ghosts.forEach((ghost) => {
      ghost.speed = 1000;
    });
    for (let powerup of powerups) {
      powerup.classList.add("none");
    }
    powerUpDiv.classList.add("none");
    ghosts.forEach((ghost) => moveGhost(ghost));
    questionPanel.classList.add("none");
    speedChange = setTimeout(() => {
      //changes back the speed of the ghost after the specified time.
      ghosts.forEach((ghost) => {
        switch (ghost.className) {
          case "blinky":
            ghost.speed = 520;
            break;
          case "pinky":
            ghost.speed = 550;
            break;
          case "inky":
            ghost.speed = 500;
            break;
          case "clyde":
            ghost.speed = 550;
            break;
        }
        ghosts.forEach((ghost) => clearInterval(ghost.timerId));
        ghosts.forEach((ghost) => moveGhost(ghost));
      });
    }, 20000);
  }

  //                                              //
  // Delete ghost taking it from the ghosts array //
  //                                              //

  function deleteGhost() {
    if (ghosts.length > 1) {
      let removedGhost = ghosts.pop();
      removedGhost.isScared = false;
      removedGhosts.push(removedGhost);
      squares[removedGhost.currentIndex].classList.remove(
        removedGhost.className,
        "ghost",
        "scared-ghost",
        "pac-man-right"
      );
      deletedGhostTimer();
    }

    slowGhostTimerPaused = false;
    ghosts.forEach((ghost) => moveGhost(ghost));
    for (let powerup of powerups) {
      powerup.classList.add("none");
    }
    powerUpDiv.classList.add("none");
    questionPanel.classList.add("none");
  }

  function slowGhostTimer(time) {
    if (countDown != null) {
      clearInterval(countDown);
    }

    powerUpTimer.classList.remove("none");
    let seconds = time;
    console.log(seconds);
    powerUpEndTimeSlowGhost.textContent = seconds;
    countDown = setInterval(() => {
      if (!slowGhostTimerPaused) {
        powerUpEndTimeSlowGhost.textContent = seconds;
        if (seconds != 0) {
          seconds--;
        } else {
          powerUpTimer.classList.add("none");
          clearInterval(countDown);
        }
        console.log("slowTimer");
      }
    }, 1000);
  }

  function deletedGhostTimer() {
    if (slowGhostTimerPaused) {
    }
    deleteGhostTimer.classList.remove("none");
    let seconds = 20;
    ghostReturnTimer.textContent = seconds;
    let secondsTimer = setInterval(() => {
      if (!slowGhostTimerPaused) {
        seconds--;
        console.log("delete Timer");
        ghostReturnTimer.textContent = seconds;
        if (seconds === 0) {
          returnGhost();
          clearInterval(secondsTimer);
        }
      }
    }, 1000);
  }
  //                                               //
  // Adds ghost back to array after the timer ends //
  //                                               //
  function returnGhost() {
    removedGhosts.forEach((ghost) => {
      ghosts.push(ghost);
    });
    ghosts.forEach((ghost) => {
      squares[ghost.currentIndex].classList.remove(
        ghost.className,
        "ghost",
        "scared-ghost",
        "pac-man-right"
      );
      clearInterval(ghost.timerId);
      moveGhost(ghost);
    });
    removedGhosts = [];
    deleteGhostTimer.classList.add("none");
  }
  //                                  //
  // shows time left for scared ghosts//
  //                                  //
  function scaredGhostTimer() {
    clearInterval(secondsTimer);
    scaredGhostsP.classList.remove("none");
    let seconds = 20;
    scaredGhostTime.textContent = seconds + " ";
    secondsTimer = setInterval(() => {
      if (!slowGhostTimerPaused) {
        seconds--;
        scaredGhostTime.textContent = seconds + " ";
        if (seconds === 0) {
          clearInterval(secondsTimer);
          scaredGhostsP.classList.add("none");
        }
      }
    }, 1000);
  }
});
