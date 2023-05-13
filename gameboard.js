export { Gameboard };

import { Ship } from "./ship.js";
import { Cell } from "./cell.js";
import settings from "./gamesettings.json" assert { type: "json" };
import { GameController } from "./gamecontroller.js";

class Gameboard {
  constructor(newOwner) {
    this.buildBoard();
    this.owner = newOwner;
  }

  owner = null;
  ships = [];
  board = [];
  //   hits = [];
  //   misses = [];

  buildBoard = () => {
    for (let i = settings.config.boardSize; i > 0; i--) {
      for (let j = 1; j <= settings.config.boardSize; j++) {
        this.board.push(new Cell({ x: j, y: i }, this));
      }
    }
  };

  placeShips = (positions, ship = new Ship(positions, positions.length)) => {
    positions.forEach((position, i) => {
      let foundCell = this.getCellByPosition(position);
      if (foundCell != null) {
        let axis = positions[0].x != positions[1].x ? "x" : "y";
        let onFirstCell = i < 1;
        let onLastCell = i == positions.length - 1;
        let forward =
          positions[0].x + positions[0].y < positions[1].x + positions[1].y;

        if (onFirstCell && forward) {
          foundCell.first = true;
        }
        if (onFirstCell && !forward) {
          foundCell.last = true;
        }
        if (onLastCell && forward) {
          foundCell.last = true;
        }
        if (onLastCell && !forward) {
          foundCell.first = true;
        }

        foundCell.axis = axis;
        foundCell.ship = ship;
      }
    });
    this.ships.push(ship);
  };

  getCellByPosition = (position) => {
    let foundCell = null;
    foundCell = this.board.find(
      (cell) => cell.position.x == position.x && cell.position.y == position.y
    );
    return foundCell ? foundCell : null;
  };

  placeShipRandom = (shipSize) => {
    let randomSegment = this.getRandomSegmentOfLength(shipSize);
    let validSegment = null;
    let attemps = 0;
    let maxAttemps = 400;

    while (validSegment == null && attemps < maxAttemps) {
      if (
        randomSegment.every((position) => {
          let foundCell = this.getCellByPosition(position);
          return foundCell.ship == null;
        })
      ) {
        validSegment = randomSegment;
      } else {
        randomSegment = this.getRandomSegmentOfLength(shipSize);
        attemps++;
      }
    }

    this.placeShips(validSegment);
  };

  getRandomSegmentOfLength(length) {
    let x = Math.max(parseInt(Math.random() * settings.config.boardSize), 1);
    let y = Math.max(parseInt(Math.random() * settings.config.boardSize), 1);

    let randomSegment = [];

    // randomly select an axis to increment
    var chosenAxis = Math.random() < 0.5 ? x : y;

    // decide whether to move forward or backward along that axis
    // depending on which direction has enough room to fit the length specified
    if (settings.config.boardSize - chosenAxis >= length) {
      for (let i = 1; i <= length; i++) {
        randomSegment.push(
          chosenAxis == x
            ? { x: chosenAxis + i, y: y }
            : { x: x, y: chosenAxis + i }
        );
      }
    } else {
      for (let i = 1; i <= length; i++) {
        randomSegment.push(
          chosenAxis == x
            ? { x: chosenAxis - i, y: y }
            : { x: x, y: chosenAxis - i }
        );
      }
    }
    return randomSegment;
  }

  shipsSunk = () => {
    this.ships.forEach((ship) => {});
    return this.ships.every((ship) => ship.isSunk());
  };

  receiveAttack = (location) => {
    let hitCell = this.getCellByPosition(location);
    hitCell.hit();
  };
}
