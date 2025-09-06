const cells = document.querySelectorAll(".cell");
const span = document.createElement("span");
const currentPlayerText = document.getElementById("current-player");
const resetBtn = document.querySelector(".reset-btn");
let audio;
let previousMoves = [];
let result = [];

span.style.marginLeft = "5px";

document.addEventListener("DOMContentLoaded", () => {
  audio = new Audio("./click-151673.mp3");
  audio.load();
});

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
          drawX(ele);
        } else {
          drawO(ele);
        }
        fillBoard(ele);
        switchPlayer();
        checkWinner();
      }
    }
  });
});

const undoBtn = document.getElementById("undo-btn");
document.querySelector(".tic-tac-toe-body").addEventListener("click", () => {
  undoBtn.disabled = previousMoves.length === 0;
  if (!isGameRunning) {
    undoBtn.disabled = true;
  }
});

document.getElementById("undo-btn").addEventListener("click", () => {
  const undoMove = previousMoves.pop();
  const pos = board.findIndex((_, i) => i == undoMove);
  if (pos !== -1) {
    document.querySelectorAll(".cell")[undoMove].firstElementChild.remove();
    board = board.map((val, i) => (i === pos ? "" : val));
  }
  undoBtn.disabled = previousMoves.length === 0;
});

function switchPlayer() {
  if (isGameRunning) {
    audio.play();
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
    const cellData = cell.getAttribute("data-index");
    board[cellData] = currentPlayer;
    previousMoves.push(cellData);
  }
}

function checkWinner() {
  for (let i = 0; i < winningCombo.length; i++) {
    const a = winningCombo[i][0];
    const b = winningCombo[i][1];
    const c = winningCombo[i][2];

    if (isXWon(a, b, c)) {
      paintWinnerDiv(a, b, c);
      setWinner("X");
      setResult("X");
      break;
    } else if (isOWon(a, b, c)) {
      paintWinnerDiv(a, b, c);
      setWinner("O");
      setResult("O");
      break;
    }
  }
  enusreIsNotDraw();
}

function setResult(winner) {
  const resultEle = document.getElementById(
    winner == "X" ? "x-result" : "o-result"
  );
  const playerwon = { player: winner, score: 1 };
  const playerExists = result.find((res) => res.player === playerwon.player);
  if (playerExists) {
    playerExists.score += 1;
    resultEle.innerText = `${winner}: ${playerExists.score}`;
  } else {
    result.push(playerwon);
    resultEle.innerText = `${winner}: 1`;
  }
}

function isXWon(a, b, c) {
  return board[a] === "X" && board[b] === "X" && board[c] === "X";
}
function isOWon(a, b, c) {
  return board[a] === "O" && board[b] === "O" && board[c] === "O";
}
function paintWinnerDiv(a, b, c) {
  const shawdow = "rgba(99, 99, 99, 1) 0px 2px 15px 0px";
  cells.forEach((cell) => {
    if (cell.getAttribute("data-index") == a) {
      cell.style.boxShadow = shawdow;
    } else if (cell.getAttribute("data-index") == b) {
      cell.style.boxShadow = shawdow;
    } else if (cell.getAttribute("data-index") == c) {
      cell.style.boxShadow = shawdow;
    }
  });
}
function setWinner(playerWon) {
  winner = playerWon;
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
    cell.style.boxShadow = "";
  });
  undoBtn.disabled = true;
  previousMoves = [];
  result = [];
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
  const x = document.createElement("span");
  x.setAttribute("class", "X");
  cell.appendChild(x);
}

function drawO(cell) {
  const o = document.createElement("span");
  o.setAttribute("class", "O");
  cell.appendChild(o);
}
