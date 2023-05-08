export { Player };

import { Gameboard } from "./gameboard.js";

class Player {
  constructor() {
    this.gameBoard = new Gameboard(this);
  }
  gameBoard = null;
  score = 0;

  getGameboard = () => gameBoard;

  receiveAttack = (location) => {
    return gameBoard.receiveAttack(location.x, location.y) ? "hit" : "miss";
  };
}
