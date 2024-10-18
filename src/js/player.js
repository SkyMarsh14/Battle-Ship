import { Gameboard } from "./gameboard.js";

class Player {
  constructor(name = "Player", computer = false) {
    this.name = name;
    this.computer = computer;
    this.gameboard = new Gameboard();
  }
  attack(gameboard, x, y) {
    return gameboard.receiveAttack(x, y);
  }
}
export { Player };
