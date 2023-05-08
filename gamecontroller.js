export { GameController };

import shipTypes from "./shiptypes.json" assert { type: "json" };
import { Ship } from "./ship.js";
import { Player } from "./player.js";

const GameController = (() => {
  const players = [];
  let playerOne = null;
  let playerTwo = null;
  let currentPlayer = null;

  const getCurrentPlayer = () => currentPlayer;

  const setupGame = () => {
    playerOne = new Player();
    playerTwo = new Player();
    currentPlayer = playerOne;
    players.push(playerOne, playerTwo);

    //placeShips();
  };

  const processAttack = (target) => {
    let location = JSON.parse(target.dataset.location);
    let result = sendAttack(location, playerTwo);
    return result;
  };

  const sendAttack = (location, player) => {
    return player.receiveAttack(location);
  };

  const placeShips = () => {
    for (const type in shipTypes) {
      for (let i = 1; i <= shipTypes[type].count; i++) {
        let locations = [];
        for (let i = 1; i <= shipTypes[type].size; i++) {
          locations.push({ x: i, y: 2 });
        }
        let newShip = Ship(locations);
        playerTwo.getGameboard.ships.push(newShip);
      }
    }
  };

  return { setupGame, processAttack, getCurrentPlayer };
})();
