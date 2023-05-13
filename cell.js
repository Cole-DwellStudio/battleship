export { Cell };
import { DisplayController } from "./displaycontroller.js";

class Cell {
  constructor(position, board) {
    this.position = position;
    this.board = board;
  }

  isHit = false;
  ship = null;
  position = null;
  first = null;
  last = null;
  axis = "none";

  hit = () => {
    this.isHit = true;
    if (this.ship != null) this.ship.hit();
  };
}
