const cells = document.querySelectorAll(".cell");
const span = document.createElement("span");
const currentPlayerText = document.getElementById("current-player");
const resetBtn = document.querySelector(".reset-btn");

span.style.marginLeft = "5px";

let currentPlayer = "X";
let isGameRunning = true;
let winner = "";
let board = Array.from({ length: 9 }, () => "");
let isDraw = false;

const winningCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [6, 4, 2],
];

cells.forEach((ele) => {
  ele.addEventListener("click", () => {
    if (isEmptyCell(ele)) {
      if (isGameRunning) {
        if (currentPlayer === "X") {
          fillBoard(ele);
          switchPlayer();
          drawX(ele);
        } else {
          fillBoard(ele);
          switchPlayer();
          drawO(ele);
        }
        checkWinner();
      }
    }
  });
});

function switchPlayer() {
  if (isGameRunning) {
    if (currentPlayer === "X") {
      currentPlayer = "O";
      span.innerText = "O.";
      currentPlayerText.innerText = `Current Player:`;
      currentPlayerText.appendChild(span);
    } else {
      currentPlayer = "X";
      span.innerText = "X.";
      currentPlayerText.innerText = "Current Player:";
      currentPlayerText.appendChild(span);
    }
    switchColor(currentPlayer);
  }
}
function switchColor(player) {
  if (player === "X") {
    span.style.color = "#FF6B6B";
  } else if (player === "O") {
    span.style.color = "#A0E8B0";
  }
}

function isEmptyCell(cell) {
  return cell.innerHTML === "";
}

function fillBoard(cell) {
  if (isGameRunning) {
    board[cell.getAttribute("data-index")] = currentPlayer;
  }
}

function checkWinner() {
  for (let i = 0; i < winningCombo.length; i++) {
    const a = winningCombo[i][0];
    const b = winningCombo[i][1];
    const c = winningCombo[i][2];

    if (isXWon(a, b, c)) {
      setWinner("X");
      paintWinnerDiv(a, b, c);
      break;
    } else if (isOWon(a, b, c)) {
      paintWinnerDiv(a, b, c);
      setWinner("O");
      break;
    }
  }
  enusreIsNotDraw();
}

function isXWon(a, b, c) {
  return board[a] === "X" && board[b] === "X" && board[c] === "X";
}
function isOWon(a, b, c) {
  return board[a] === "O" && board[b] === "O" && board[c] === "O";
}
function paintWinnerDiv(a, b, c) {
  cells.forEach((cell) => {
    if (cell.getAttribute("data-index") == a) {
      cell.style.backgroundColor = "#d6d6d6";
    } else if (cell.getAttribute("data-index") == b) {
      cell.style.backgroundColor = "#d6d6d6";
    } else if (cell.getAttribute("data-index") == c) {
      cell.style.backgroundColor = "#d6d6d6";
    }
  });
}
function setWinner(winner) {
  winner = winner;
  isGameRunning = false;
  currentPlayerText.innerText = "Game is Over, final winner is:";
  span.innerText = `${winner}.`;
  currentPlayerText.appendChild(span);
  resetBtn.style.display = "block";
  setWinnerColor(winner);
}

function setWinnerColor(winner) {
  if (winner === "X") {
    span.style.color = "#FF6B6B";
  } else if (winner === "O") {
    span.style.color = "#A0E8B0";
  }
}

function resetGame() {
  currentPlayer = "X";
  isGameRunning = true;
  winner = "";
  board = Array.from({ length: 9 }, () => "");
  span.innerText = "X.";
  currentPlayerText.innerText = "Current Player:";
  span.style.color = "#FF6B6B";
  currentPlayerText.appendChild(span);
  cells.forEach((cell) => (cell.textContent = ""));
  resetBtn.style.display = "none";
  isDraw = false;
  cells.forEach((cell) => {
    cell.style.backgroundColor = "";
  });
}

function enusreIsNotDraw() {
  if (isGameRunning) {
    isDraw = board.every((value) => value !== "");
    if (isDraw) {
      span.style.color = "grey";
      setWinner("Draw  :(");
    }
  }
}

function drawX(cell) {
  const x = document.createElement("div");
  x.setAttribute("class", "X");
  cell.appendChild(x);
}

function drawO(cell) {
  const o = document.createElement("div");
  o.setAttribute("class", "O");
  cell.appendChild(o);
}
