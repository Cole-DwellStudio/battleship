export { Player };

import { DisplayController } from "./displaycontroller.js";
import { Gameboard } from "./gameboard.js";

class Player {
  constructor(name) {
    this.name = name;
    this.gameBoard = new Gameboard(this);
  }
  gameBoard = null;
  score = 0;

  getGameboard = () => this.gameBoard;

  takeTurn = async () => {
    let result = await DisplayController.getMove();
    // result.resolve({ x: 8, y: 8 });
    return result;
  };

  receiveAttack = (location) => {
    this.gameBoard.receiveAttack(location);
  };
}
