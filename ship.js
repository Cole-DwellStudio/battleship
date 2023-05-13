export { Ship };

class Ship {
  constructor(locations, length, type) {
    this.locations = locations;
    this.length = length;
    this.type = type;
  }

  type = null;
  length = 0;
  hits = 0;

  hit = () => {
    this.hits++;
  };

  isHit = (x, y) => {
    let success = false;
    locations.forEach((location) => {
      if (location.x == x && location.y == y) {
        hit();
        success = true;
      }
    });
    return success;
  };

  isSunk = () => {
    if (this.hits >= this.length) return true;
    return false;
  };
}
