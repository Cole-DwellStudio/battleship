export { DisplayController };
import { GameController } from "./gamecontroller.js";

const DisplayController = (() => {
  const boardsContainer = document.getElementById("boardsContainer");
  const playerOneBoard = document.getElementById("playerOne");
  const playerTwoBoard = document.getElementById("playerTwo");
  const buttonNewGame = document.getElementById("buttonNewGame");
  const boardSize = 10;

  buttonNewGame.addEventListener("click", (e) => {
    GameController.setupGame();
    renderBoards();
  });

  playerTwoBoard.addEventListener("click", (e) => {
    // console.log(e.target.parentElement.id);
    // console.log(JSON.parse(e.target.dataset.location));
    // console.log(JSON.parse(e.target.dataset.isOccupied));
    if (e.target.classList[0] == "cell") {
      handleInput(e);
    }
  });

  const handleInput = (e) => {
    let result = GameController.processAttack(e.target);
    updateCell(e.target, result);
  };

  const updateCell = (cell, result) => {
    if (result == "hit") {
      cell.classList.add("hit");
      cell.dataset.isHit = `true`;
    } else if (result == "miss") {
      cell.classList.add("miss");
      cell.dataset.isHit = `true`;
    }
  };

  const renderBoards = () => {
    renderCells(playerOneBoard);
    renderCells(playerTwoBoard);
  };

  const renderCells = (containerElement) => {
    containerElement.innerHTML = "";
    for (let i = boardSize; i > 0; i--) {
      for (let j = 1; j <= boardSize; j++) {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.dataset.location = `{"x":${j}, "y":${i}}`;
        cellElement.dataset.isOccupied = `false`;
        cellElement.dataset.isHit = `false`;
        containerElement.appendChild(cellElement);
      }
    }
  };

  return { renderBoards };
})();
