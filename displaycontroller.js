export { DisplayController };
import { GameController } from "./gamecontroller.js";

const DisplayController = (() => {
  const boardsContainer = document.getElementById("boardsContainer");
  //   const playerOneBoard = document.getElementById("playerOne");
  //   const playerTwoBoard = document.getElementById("playerTwo");
  const buttonNewGame = document.getElementById("buttonNewGame");
  const boardSize = 10;

  let currentMove = { x: 1, y: 6 };

  buttonNewGame.addEventListener("click", (e) => {
    GameController.playGame();
  });

  const getMove = () => {
    return new Promise((resolve, reject) => {
      boardsContainer.addEventListener("click", (e) => {
        if (
          e.target.parentElement.classList.contains("board") &&
          e.target.parentElement.id == "playerTwo"
        ) {
          resolve(JSON.parse(e.target.dataset.position));
        }
      });
    });
  };

  const updateCell = (cell) => {
    let player = GameController.getCurrentPlayer().name;
    let foundCell = getCellByPosition(cell.position, player);

    let status = cell.ship == null ? "miss" : "hit";

    if (foundCell != null) {
      foundCell.classList.add(status);
      foundCell.dataset.isHit = "true";
    }
  };

  const renderBoards = () => {
    boardsContainer.innerHTML = "";
    GameController.getPlayers().forEach((player) => {
      renderBoard(player.getGameboard().board, player.name);
    });
  };

  const gameOver = () => {
    boardsContainer.childNodes.forEach((board) => {
      board.childNodes.forEach((cellElement) => {
        cellElement.id = "";
      });
    });
  };

  const renderBoard = (board, playerName) => {
    let containerElement = document.createElement("div");
    containerElement.id = playerName;
    containerElement.classList.add("board");
    board.forEach((cell) => {
      //   console.log(cell);
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      if (playerName == "playerTwo") {
        cellElement.id = "opponent";
      }
      if (GameController.winner != null) {
        cellElement.id = "";
      }
      if (cell.ship != null) {
        cellElement.classList.add(`ship${cell.axis}`);
      }
      if (cell.first == true) {
        cellElement.classList.add("startCap");
      } else if (cell.last == true) {
        cellElement.classList.add("endCap");
      }

      if (cell.isHit == true && cell.ship == null) {
        cellElement.classList.add("miss");
      } else if (cell.isHit == true && cell.ship != null) {
        cellElement.classList.add("hit");
      }

      cellElement.dataset.position = `{"x":${cell.position.x}, "y":${cell.position.y}}`;

      containerElement.appendChild(cellElement);
    });
    boardsContainer.appendChild(containerElement);
  };

  const getCellByPosition = (position, player) => {
    let foundCell = null;
    if (player == "playerOne") {
      playerTwoBoard.childNodes.forEach((element) => {
        if (
          JSON.parse(element.dataset.location).x == position.x &&
          JSON.parse(element.dataset.location).y == position.y
        ) {
          foundCell = element;
        }
      });
    }
    return foundCell;
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
        cellElement.dataset.player = `${containerElement.constructor.name}`;
        containerElement.appendChild(cellElement);
      }
    }
  };

  return { renderBoards, updateCell, getMove, gameOver };
})();
