"use strict";

const X_CLASS = "x";
const CIRC_CLASS = "circ";
const WIN_COMBO = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellEl = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winMsgEl = document.getElementById("winning-message");
const winMsgTextEl = document.querySelector("[data-win-text]");
const restartBtn = document.getElementById("restartBtn");
let turn;

startGame();

restartBtn.addEventListener("click", startGame);

function startGame() {
  turn = false;
  cellEl.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRC_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHover();
  winMsgEl.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const curClass = turn ? CIRC_CLASS : X_CLASS;
  placeMark(cell, curClass);
  if (checkWin(curClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHover();
  }
}

const placeMark = function (cell, curClass) {
  cell.classList.add(curClass);
};

function endGame(draw) {
  if (draw) {
    winMsgTextEl.innerText = "Game tied!";
  } else {
    winMsgTextEl.innerText = `${turn ? "O" : "X"} wins the game!`;
  }
  winMsgEl.classList.add("show");
}

function isDraw() {
  return [...cellEl].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRC_CLASS)
    );
  });
}
const swapTurns = function () {
  turn = !turn;
};

function setBoardHover() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRC_CLASS);

  if (turn) {
    board.classList.add(CIRC_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(curClass) {
  return WIN_COMBO.some((combination) => {
    return combination.every((idx) => {
      return cellEl[idx].classList.contains(curClass);
    });
  });
}
