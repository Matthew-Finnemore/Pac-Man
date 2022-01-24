document.addEventListener("DOMContentLoaded", () => {
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
  let pacManDirection = "pac-man-right";
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
  const layout2 = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0,
    0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1,
    1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0,
    1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0,
    0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1,
    1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, 1, 0, 1,
    1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1,
    1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1,
    1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0,
    1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1,
    0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 4, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 4, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    4, 4, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 0, 1, 4, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 0, 1, 4, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 4, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1,
    0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 4, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1,
    0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 4, 1, 4, 4, 4, 0, 1, 0, 1,
    1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 4, 1, 4, 1, 1, 0,
    1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 4, 2, 2,
    2, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
    4, 2, 2, 2, 1, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 4, 1, 1, 2, 2, 2, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 4, 1,
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

      //add layout to the board
      if (chosenLayout[i] === 0) {
        squares[i].classList.add("pac-dot");
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
      // checkForGameOver();
      checkForWin();
      checkForQuestion();
    }
  }
  // Show the Question Panel and generate Question

  function checkForQuestion() {
    switch (true) {
      case score >= 10 && qOneAnswered === false:
        makeQuestion();
        qOneAnswered = true;
        break;
      case score >= 20 && qTwoAnswered === false:
        makeQuestion();
        qTwoAnswered = true;
        break;
      case score >= 30 && qThreeAnswered === false:
        makeQuestion();
        qThreeAnswered = true;
        break;
      case score >= 40 && qFourAnswered === false:
        makeQuestion();
        qFourAnswered = true;
        break;
      case score >= 50 && qFiveAnswered === false:
        makeQuestion();
        qFiveAnswered = true;
        break;
    }
  }

  function submit() {
    let answerInput = document.querySelector("input");
    answeringQuestion = false;

    if (answerInput.value.toString() === answer.toString()) {
      questions.classList.add("none");
      powerUpDiv.classList.remove("none"); // add opposite to powerup func
      answerInput.value = "";

      for (let powerup of powerups) {
        powerup.classList.remove("none");
      }
    } else {
      alert("Your Wrong! Why not try again");
    }
  }

  // what happens when you eat a pac-dot
  function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
      score++;
      // @ts-ignore
      scoreDisplay.textContent = score;
      squares[pacmanCurrentIndex].classList.remove("pac-dot");
    }
  }

  //what happens when you eat a power-pellet
  function powerPelletEaten() {
    if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
      score += 10;
      // @ts-ignore
      scoreDisplay.textContent = score;
      ghosts.forEach((ghost) => (ghost.isScared = true));
      setTimeout(unScareGhosts, 10000);
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
  const ghosts = [
    new Ghost("blinky", 348, 500),
    new Ghost("pinky", 376, 250),
    new Ghost("inky", 351, 320),
    new Ghost("clyde", 379, 140),
  ];

  function moveGhost(ghost) {
    console.log(ghost.speed)
    const directions = [-1, +1, width, -width];
    let direction = directions[Math.floor(Math.random() * directions.length)];

    ghost.timerId = setInterval(function () {
      //if the next squre your ghost is going to go to does not have a ghost and does not have a wall

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
        squares[ghost.currentIndex].classList.remove(ghost.className);
        squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost");
        ghost.currentIndex += -width;
        squares[ghost.currentIndex].classList.add(
          ghost.className,
          "ghost",
          "pac-man-right"
        );
      } else if (
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
      } else
        direction = directions[Math.floor(Math.random() * directions.length)];

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
      // checkForGameOver()
    }, ghost.speed);
  }

  //check for a game over
  function checkForGameOver() {
    if (
      squares[pacmanCurrentIndex].classList.contains("ghost") &&
      !squares[pacmanCurrentIndex].classList.contains("scared-ghost")
    ) {
      ghosts.forEach((ghost) => clearInterval(ghost.timerId));
      document.removeEventListener("keyup", movePacman);
      setTimeout(function () {
        alert("Game Over");
      }, 500);
    }
  }

  //check for a win - more is when this score is reached
  function checkForWin() {
    if (score >= 1000) {
      ghosts.forEach((ghost) => clearInterval(ghost.timerId));
      document.removeEventListener("keyup", movePacman);
      setTimeout(function () {
        alert("You have WON!");
      }, 500);
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
        // @ts-ignore
        scoreDisplay.textContent = score;
        squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
      }
    });
  }
  function makeQuestion() {
    answeringQuestion = true;
    questionPanel.classList.remove("none");
    questions.classList.remove("none");
    document.getElementById("answer").focus();
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    let firstValue = Math.floor(Math.random() * 10 + 1);
    let secondValue = Math.floor(Math.random() * 10 + 1);
    let operatorRandom =
      operatorChoice[Math.floor(Math.random() * operatorChoice.length)];
    if (operatorRandom === "÷" && firstValue % secondValue != 0) {
      console.log("here");
      operatorRandom =
        operatorChoice[Math.floor(Math.random() * (operatorChoice.length - 1))];
    }
    console.log(firstValue, secondValue);
    if (operatorRandom === "-" && firstValue < secondValue) {
      console.log("here");
      [firstValue, secondValue] = [secondValue, firstValue];
    }
    console.log(firstValue, secondValue);
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
  document.getElementById("slow-ghosts").addEventListener("click", slowGhosts);
  document
    .getElementById("delete-ghost")
    .addEventListener("click", deleteGhost);
  document
    .getElementById("double-dot-points")
    .addEventListener("click", doubleDotPoints);

  function slowGhosts() {
    ghosts.forEach((ghost) => {
      ghost.speed = 1000;
    });
    for (let powerup of powerups) {
      powerup.classList.add("none");
    }
    powerUpDiv.classList.add("none"); // add opposite to powerup func
    ghosts.forEach((ghost) => moveGhost(ghost)); //move to powerup choice
    questionPanel.classList.add("none");
  }

  function deleteGhost() {}

  function doubleDotPoints() {}
  //end of tags
});
