window.addEventListener("load", () => {

  let winOrLose = document.getElementById("win-or-lose")
  let yourFinalScoreSpan = document.getElementById("your-final-score");
  let highScore = document.getElementById("high-score")
  yourFinalScoreSpan.textContent = localStorage.getItem("score");
  highScore.textContent = localStorage.getItem("highScore")

  function displayMessage() {
    if (localStorage.getItem("gameOver") === "won") {
      winOrLose.textContent = "WELL DONE YOU ATE ALL OF THE DOTS, COULD YOU GET A HIGHER SCORE?"
    } else {
      winOrLose.textContent = "OH NO! A GHOST GOT YOU TRY AGAIN"
    }
  }
  displayMessage();



})

