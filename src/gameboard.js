import { Ship } from "./ship.js";

class Gameboard {
  constructor(size = 7) {
    this.size = size;
    this.board = Array.from({ length: size }, () => new Array(size).fill(null));
    this.missed = [];
    this.ships = [];
  }

  placeShip(row, col, shipSize, direction = "horizontal") {
    const ship = new Ship(shipSize);
    this.board[row][col] = ship;
    this.ships.push([row, col]);
    if (direction === "horizontal") {
      for (let i = 1; i <= shipSize; i++) {
        let currentLoc = this.board[row][col + i];
        if (currentLoc) {
          throw new Error("Looks like a ship has been already placed here!");
        }
        currentLoc = ship;
      }
    }
    if (direction === "vertical") {
      for (let i = 1; i <= shipSize; i++) {
        let currentLoc = this.board[row + i][col];
        if (currentLoc) {
          throw new Error("Looks like a ship has been already placed here!");
        }
        currentLoc = ship;
      }
    }
  }
  receiveAttack(row, col) {
    const ship = this.board[row][col];
    if (ship) {
      ship.hit();
      return true;
    }
    this.missed.push([row, col]);
    return false;
  }
  showMissedShots() {
    return this.missed;
  }
  areAllShipsSunk() {
    //check if there's any ship that is not sunk.
    const sunk = (x, y) => this.board[x][y].isSunk();
    return !this.ships.some((ship) => {
      return !sunk(ship[0], ship[1]);
    });
  }
}

export { Gameboard };
