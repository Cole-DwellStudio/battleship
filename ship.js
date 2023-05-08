export { Ship };

const Ship = (newLocations) => {
  let length = 0;
  let hits = 0;
  let sunk = false;
  let locations = newLocations;

  const hit = () => {
    if (!isSunk()) {
      hits++;
    }
    isSunk();
  };

  const isHit = (x, y) => {
    let success = false;
    locations.forEach((location) => {
      if (location.x == x && location.y == y) {
        hit();
        success = true;
      }
    });
    return success;
  };

  const isSunk = () => {
    return hits >= length;
  };

  return {
    hit,
    isSunk,
    isHit,
    locations,
  };
};
