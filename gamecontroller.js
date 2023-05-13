export { GameController };

import shipTypes from "./shiptypes.json" assert { type: "json" };
import settings from "./gamesettings.json" assert { type: "json" };
import { Player } from "./player.js";
import { DisplayController } from "./displaycontroller.js";
import { PlayerAI } from "./playerai.js";

const GameController = (() => {
  let players = [];
  let playerOne = null;
  let playerTwo = null;
  let currentPlayer = null;
  let gameWon = false;
  let winner = null;
  let turns = 0;
  let maxTurns = settings.config.maxTurns;

  const getCurrentPlayer = () => currentPlayer;
  const getPlayers = () => players;

  const getGameBoards = () => {
    return players.map((player) => {
      return player.getGameboard();
    });
  };

  const setupGame = () => {
    playerOne = new Player("playerOne");
    playerTwo = new PlayerAI("playerTwo");
    currentPlayer = playerOne;
    winner = null;
    players = [];
    players.push(playerOne, playerTwo);
    turns = 0;

    placeShips(playerOne.getGameboard());
    placeShips(playerTwo.getGameboard());

    DisplayController.renderBoards();
  };

  const playGame = () => {
    setupGame();
    takeTurn(currentPlayer);
  };

  const takeTurn = async (player = currentPlayer) => {
    let move = await player.takeTurn();
    processMove(move);
    DisplayController.renderBoards();
    if (!checkWon()) {
      swapTurns();
      if (turns < maxTurns) {
        takeTurn();
        turns++;
      } else {
        alert("Reached max turn limit, please try again.");
        playGame();
      }
    } else {
      gameOver();
    }
  };

  const checkWon = () => {
    return players.some((player) => player.getGameboard().shipsSunk());
  };

  const processMove = (move) => {
    let target = currentPlayer == playerOne ? playerTwo : playerOne;
    sendAttack(move, target);
  };

  const swapTurns = () => {
    currentPlayer = currentPlayer == playerOne ? playerTwo : playerOne;
  };

  const processAttack = (target) => {
    if (currentPlayer != playerOne) return;
    let location = JSON.parse(target.dataset.position);
    sendAttack(location, playerTwo);
    currentPlayer = playerTwo;
    playerTwo.attack();
    DisplayController.renderBoards();
    currentPlayer = playerOne;
  };

  const sendAttack = (location, player) => {
    player.receiveAttack(location);
  };

  const placeShips = (gameboard) => {
    for (const type in shipTypes) {
      for (let i = 1; i <= shipTypes[type].count; i++) {
        gameboard.placeShipRandom(shipTypes[type].size);
      }
    }
  };

  const gameOver = () => {
    winner = currentPlayer == playerOne ? "Player One" : "Player Two";
    DisplayController.gameOver();
    alert(`Game over. ${winner} won!`);
  };

  return {
    playGame,
    processAttack,
    getCurrentPlayer,
    getGameBoards,
    getPlayers,
    sendAttack,
    gameOver,
    gameWon,
    winner,
  };
})();
