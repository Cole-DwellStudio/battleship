export { Gameboard };

import { Ship } from "./ship.js";
import { Cell } from "./cell.js";

class Gameboard {
  constructor(newOwner) {
    this.buildBoard();
    this.owner = newOwner;
  }

  owner = null;
  hits = [];
  misses = [];
  ships = [];
  board = [];

  buildBoard = () => {
    for (let i = 10; i > 0; i--) {
      for (let j = 1; j <= 10; j++) {
        this.board.push(new Cell(j, i));
      }
    }
  };

  shipsSunk = () => {
    return this.ships.every((ship) => {
      ship.isSunk() == true;
    });
  };

  receiveAttack = (x, y) => {
    let hitShips = ships.filter((ship) => ship.isHit(x, y) == true);
    if (hitShips.length > 0) {
      hitShips[0].hit();
      this.hits.push({ x: x, y: y });
      return true;
    } else {
      this.misses.push({ x: x, y: y });
      return false;
    }
  };
}
