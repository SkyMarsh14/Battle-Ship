import { Gameboard } from "./gameboard";

class Player {
  constructor(name = "Player", computer = false) {
    this.name = name;
    this.computer = computer;
    this.gameboard = new Gameboard();
  }

  placeShipRandom() {}
}
