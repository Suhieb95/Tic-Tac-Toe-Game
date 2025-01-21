const cells = document.querySelectorAll(".cell");
const span = document.createElement("span");
const currentPlayerText = document.getElementById("current-player");

let currentPlayer = "X";
let isGameRunning = true;
let winner = "";
let board = Array.from({ length: 9 }, () => "");

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
          ele.textContent = "X";
        } else {
          fillBoard(ele);
          switchPlayer();
          ele.textContent = "O";
        }
        console.log(board);
        checkWinner();
      }
    }
  });
});

function switchPlayer() {
  span.style.color = "red";
  span.style.marginLeft = "10px";
  span.style.marginTop = "3px";

  if (isGameRunning) {
    if (currentPlayer === "X") {
      currentPlayer = "O";
      span.innerText = "O";
      currentPlayerText.innerText = `Current Player:`;
      currentPlayerText.appendChild(span);
    } else {
      currentPlayer = "X";
      span.innerText = "X";
      currentPlayerText.innerText = "Current Player:";
      currentPlayerText.appendChild(span);
    }
  }
}

function isEmptyCell(cell) {
  return cell.textContent === "";
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

    if (board[a] === "X" && board[b] === "X" && board[c] === "X") {
      setWinner("X");
      break;
    } else if (board[a] === "O" && board[b] === "O" && board[c] === "O") {
      setWinner("O");
      break;
    }
  }
}

function setWinner(winner) {
  winner = winner;
  isGameRunning = false;
  currentPlayerText.innerText = "Game is Over, final winner is: ";
  span.innerText = `${winner}.`;
  currentPlayerText.appendChild(span);
}

function resetGame() {
  currentPlayer = "X";
  isGameRunning = true;
  winner = "";
  board = Array.from({ length: 9 }, () => "");
  span.innerText = "X";
  currentPlayerText.innerText = "Current Player:";
  currentPlayerText.appendChild(span);
}
