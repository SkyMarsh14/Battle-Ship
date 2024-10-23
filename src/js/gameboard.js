import { Ship } from "./ship.js";

class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.board = Array.from({ length: size }, () => new Array(size).fill(null));
    this.missed = [];
    this.ships = [];
    this.gotHit = [];
    this.printTable = this.printTable.bind(this);
  }

  get attacked() {
    return this.gotHit.concat(this.missed);
  }
  getShipCoodinate(row, col, shipSize, direction) {
    if (row > this.size - 1 || col > this.size - 1) {
      throw new Error("Invalid coodinate");
    }
    const shipCoodinates = [];
    if (direction === "horizontal") {
      if (col + shipSize > this.board[0].length) {
        throw new Error(
          "Invalid coodinate: ship extends beyond board horizontally",
        );
      }
      for (let i = 0; i <= shipSize - 1; i++) {
        shipCoodinates.push([row, col + i]);
      }
    } else if (direction === "vertical") {
      if (row + shipSize > this.board.length) {
        throw new Error(
          "Invalid coodinate: ship extends beyond board vertically",
        );
      }
      for (let i = 0; i <= shipSize - 1; i++) {
        shipCoodinates.push([row + i, col]);
      }
    }
    return shipCoodinates;
  }
  placeShip(row, col, shipSize, direction = "horizontal") {
    const shipCoodinates = this.getShipCoodinate(row, col, shipSize, direction);
    const ship = new Ship(shipSize);
    if (shipCoodinates.some(([nx, ny]) => this.isAdjacentToShip(nx, ny))) {
      throw new Error("Cannot place ship: position already occupied.");
    }
    shipCoodinates.forEach(([x, y]) => {
      this.board[x][y] = ship;
    });
    this.ships.push([row, col]);
  }
  receiveAttack(x, y) {
    const isCellAttacked = this.attacked.some(
      (item) =>
        Array.isArray(item) &&
        item.length === 2 &&
        item[0] === x &&
        item[1] === y,
    );
    if (isCellAttacked) {
      throw new Error("You have attacked this cell already.");
    }
    const ship = this.board[y][x];
    if (ship) {
      ship.hit();
      if (this.areAllShipsSunk()) {
        console.log("You lost");
      }
      this.gotHit.push([x, y]);
      return true;
    }
    this.missed.push([x, y]);
    return false;
  }
  showMissedShots() {
    return this.missed;
  }
  areAllShipsSunk() {
    //check if there's any ship that is not sunk.
    const sunk = (x, y) => this.board[x][y].isSunk();
    return !this.ships.some(([nx, ny]) => {
      return !sunk(nx, ny);
    });
  }
  printTable() {
    console.table(this.board);
  }
  isAdjacentToShip(x, y) {
    const naighbors = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
      [x + 1, y + 1],
      [x - 1, y - 1],
      [x + 1, y - 1],
      [x - 1, y + 1],
    ];
    return naighbors.some(([nx, ny]) => {
      if (
        nx < 0 ||
        nx >= this.board.length ||
        ny < 0 ||
        ny >= this.board[0].length
      ) {
        return false;
      }
      return this.board[nx][ny] !== null;
    });
  }
  placeShipRandom(shipSize) {
    //get 1 or 2 to decide direction
    const direction = Math.random() > 0.5 ? "horizontal" : "vertical";
    let row;
    let col;
    if (direction === "horizontal") {
      row = Math.floor(Math.random() * (this.size - shipSize));
      col = Math.floor(Math.random() * this.size);
    } else {
      row = Math.floor(Math.random() * this.size);
      col = Math.floor(Math.random() * (this.size - shipSize));
    }
    try {
      this.placeShip(row, col, shipSize, direction);
      return;
    } catch (err) {
      console.log(err);
      this.placeShipRandom(shipSize);
    }
  }
  placeAllShipsRandom() {
    this.resetBoard();
    this.placeShipRandom(5);
    this.placeShipRandom(4);
    this.placeShipRandom(3);
    this.placeShipRandom(3);
    this.placeShipRandom(2);
    console.log("Ships has been randomly placed.");
    return this.board;
  }
  resetBoard() {
    this.board = Array.from({ length: this.size }, () =>
      new Array(this.size).fill(null),
    );
  }
  botAttack(log=[]) {
    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (this.attacked.some((item) => item[0] === x && item[1] === y));

    if (this.receiveAttack(x, y)) {
      console.log(`Bot hit your ship. Another turn.`);
      this.gotHit.push([x, y]);
      log.push([x,y])
      this.botAttack(log);
  }else{
    log.push([x,y]);

  }
    return { hit: this.gotHit, miss: this.missed,log};
  }
}
export { Gameboard };
