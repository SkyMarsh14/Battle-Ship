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
  getShipCoordinate(row, col, shipSize, direction) {
    if (row > this.size - 1 || col > this.size - 1) {
      throw new Error("Invalid coodinate");
    }
    const shipCoordinates = [];
    if (direction === "horizontal") {
      if (col + shipSize > this.size) {
        throw new Error(
          "Invalid coodinate: ship extends beyond board horizontally",
        );
      }
      for (let i = 0; i <= shipSize - 1; i++) {
        shipCoordinates.push([row, col + i]);
      }
    } else if (direction === "vertical") {
      if (row + shipSize > this.board.length) {
        throw new Error(
          "Invalid coodinate: ship extends beyond board vertically",
        );
      }
      for (let i = 0; i <= shipSize - 1; i++) {
        shipCoordinates.push([row + i, col]);
      }
    }
    return shipCoordinates;
  }
  placeShip(row, col, shipSize, direction = "horizontal") {
    const shipCoodinates = this.getShipCoordinate(
      row,
      col,
      shipSize,
      direction,
    );
    const ship = new Ship(shipSize);
    if (shipCoodinates.some(([nx, ny]) => this.isAdjacentToShip(nx, ny))) {
      throw new Error("Cannot place ship: position already occupied.");
    }
    shipCoodinates.forEach(([x, y]) => {
      this.board[x][y] = ship;
    });
    this.ships.push(ship);
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
    return this.ships.every((ship) => ship.isSunk());
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
      this.ships.push(new Ship(shipSize));
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
  botAttack(log = []) {
    let x, y;
    const bestCoord = this.getBestCoord();
    if (bestCoord) {
      [x, y] = bestCoord;
    } else {
      do {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
      } while (
        this.attacked.some(
          (item) =>
            (item[0] === x && item[1] === y) || this.isAdjacentToShip(x, y),
        )
      );
    }
    if (this.receiveAttack(x, y)) {
      console.log(`Bot hit your ship. Another turn.`);
      log.push([x, y]);
      this.botAttack(log);
    } else {
      log.push([x, y]);
    }
    return {
      hit: this.gotHit,
      miss: this.missed,
      log,
      allShipSunk: this.areAllShipsSunk(),
    };
  }

  getBestCoord() {
    // Return false if no hits were made
    if (this.gotHit.length === 0) {
      return false;
    }

    // Find a ship that got hit but hasn't been sunk yet
    const unsunkShipCoords = this.gotHit.filter(([x, y]) => {
      return !this.board[y][x].isSunk();
    });
    // If no unsunk ship is found, return false
    if (!unsunkShipCoords.length) {
      return false;
    }
    for (let i = 0; i < unsunkShipCoords.length; i++) {
      let x, y;
      let neighbors;
      [x, y] = unsunkShipCoords[i];
      if (unsunkShipCoords.length > 1) {
        if (unsunkShipCoords[0][0] === unsunkShipCoords[1][0]) {
          neighbors = [
            [x, y + 1],
            [x, y - 1],
          ];
        } else {
          neighbors = [
            [x + 1, y],
            [x - 1, y],
          ];
        }
      } else {
        // Get neighbors of the uns unk ship's coordinate
        neighbors = [
          [x + 1, y],
          [x - 1, y],
          [x, y + 1],
          [x, y - 1],
        ];
      }
      // Filter valid coordinates that are within the board boundaries
      const validNeighbors = neighbors.filter(([nx, ny]) => {
        return nx >= 0 && nx < 10 && ny >= 0 && ny < 10;
      });

      // Filter coordinates that haven't been attacked yet
      const unAttackedNeighbors = validNeighbors.filter(([nx, ny]) => {
        return !this.attacked.some(([ax, ay]) => ax === nx && ay === ny);
      });
      if (unAttackedNeighbors.length > 0)
        return unAttackedNeighbors[
          Math.floor(Math.random() * unAttackedNeighbors.length)
        ];
      // If un-attacked neighbors exist, return one; otherwise, return any valid neighbor
    }
    return false;
    // Fallback: if all neighbors have been attacked, return any valid neighbor
  }

  hasUnsunkedShip() {
    return this.gotHit.some(([x, y]) => {
      return !this.board[y][x].isSunk();
    });
  }
  getNeigborCells(x, y) {
    const neighbors = [
      [x + 1, y], //right
      [x - 1, y], //left
      [x, y - 1], //bottom
      [x, y + 1], //top
      [x + 1, y + 1], //top right
      [x - 1, y + 1], //top left
      [x + 1, y - 1], //bottom right
      [x - 1, y - 1], //bottom left
    ];
    return neighbors.filter(([nx, ny]) => {
      return nx >= 0 && nx < 10 && ny >= 0 && ny < 10;
    });
  }
  getShipNeighbors() {
    let neighbors;
    const sunkedShips = this.gotHit.filter(([x, y]) => {
      return this.board[y][x].isSunk();
    });
    sunkedShips.forEach(([nx, ny]) => {
      if (neighbors === undefined) {
        neighbors = this.getNeigborCells(nx, ny);
      }
      neighbors.concat(this.getNeigborCells(nx, ny));
    });
    return [...new Set(neighbors)];
  }
}

export { Gameboard };
