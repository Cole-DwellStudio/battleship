import { Gameboard } from "./gameboard.js";
import { GameController } from "./gamecontroller.js";
export { PlayerAI };

class PlayerAI {
  constructor(name) {
    this.name = name;
    this.gameBoard = new Gameboard(this);
    this.possibleMoves = this.shuffleArray(
      this.gameBoard.board.map((cell) => {
        return cell.position;
      })
    );
  }
  gameBoard = null;
  score = 0;
  pastMoves = [];

  getGameboard = () => this.gameBoard;

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  takeTurn = () => {
    return this.getRandomPosition();
  };

  attack = () => {
    let position = this.getRandomPosition();
    GameController.sendAttack(position, GameController.getPlayers()[0]);
  };

  getRandomPosition = () => {
    if (this.possibleMoves.length < 1) {
      return { x: 0, y: 0 };
    }
    let move = this.possibleMoves.pop();
    return move;
  };

  receiveAttack = (location) => {
    this.gameBoard.receiveAttack(location);
  };
}
