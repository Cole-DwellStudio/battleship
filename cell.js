export { Cell };

class Cell {
  constructor(x, y) {
    this.position = { x: x, y: y };
  }

  ship = null;
  hit = false;
  position = null;

  getShip = () => ship;
  getHit = () => hit;
  getPosition = () => position;
}
