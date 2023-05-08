import { Ship } from "./ship.js";
import { Gameboard } from "./gameboard.js";
const myShip = Ship();
const myGameboard = Gameboard();

describe("ShipFactory", () => {
  test("increments hit value", () => {
    expect(myShip.hit()).toBeDefined;
  });
  test("checks whether ship is sunk", () => {
    expect(myShip.isSunk()).toBe(true);
  });
});

describe("Gameboard", () => {
  test("stores hit location", () => {
    expect(myGameboard.receiveAttack(12, 2)).toEqual({ x: 12, y: 2 });
  });
});
