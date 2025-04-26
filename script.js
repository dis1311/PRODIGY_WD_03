// script.js
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6]             // diagonals
];

function checkWinner() {
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            isGameActive = false;
            statusText.textContent = `Player ${board[a]} wins! 🎉`;
            highlightWinningCells(condition);
            return;
        }
    }

    if (!board.includes("")) {
        isGameActive = false;
        statusText.textContent = "It's a draw! 🤝";
    }
}

function highlightWinningCells(cells) {
    cells.forEach(index => {
        document.querySelector(`[data-index="${index}"]`).style.backgroundColor = "#90EE90";
    });
}

function handleClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    if (board[index] !== "" || !isGameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.color = currentPlayer === "X" ? "#FF6B6B" : "#4D96FF";
    
    // Add animation
    cell.style.transform = "scale(0)";
    setTimeout(() => {
        cell.style.transform = "scale(1)";
    }, 50);

    checkWinner();

    if (isGameActive) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameActive = true;
    statusText.textContent = `Player X's turn`;
    
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.backgroundColor = "white";
        cell.style.color = "black";
        cell.style.transform = "scale(1)";
    });
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetButton.addEventListener("click", resetGame);
