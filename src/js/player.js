import { Gameboard } from "./gameboard.js";

class Player {
  constructor(name = "Player", computer = false) {
    this.name = name;
    this.computer = computer;
    this.gameboard = new Gameboard();
  }
  attack(x, y) {
    console.log(`${this.name} got an attack on ${[x, y]}`);
    return this.gameboard.receiveAttack(x, y);
  }
}
export { Player };
