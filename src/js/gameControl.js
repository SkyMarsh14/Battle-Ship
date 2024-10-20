class Gamecontrol {
  constructor(playerOne, playerTwo) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.activePlayer = playerOne;
  }

  getActivePlayer = () => this.activePlayer;
  switchPlayerTurn() {
    this.activePlayer =
      this.getActivePlayer() === this.playerOne
        ? this.playerTwo
        : this.playerOne;
  }

  getOpponentGameboard() {
    return this.activePlayer === this.playerOne
      ? this.playerTwo.gameboard
      : this.playerOne.gameboard;
  }
  attackOpponent(x, y) {
    console.log(`${this.activePlayer.name} is attacking`);
    const attack = this.activePlayer.attack(this.getOpponentGameboard(), x, y);
    if (attack) {
      console.log("Attack Successful! ");
      if (this.getOpponentGameboard().areAllShipsSunk()) {
        console.log(`${this.activePlayer.name} has won the game!`);
      }
      return;
    }
    console.log("You missed the shot! Switching Player.");
    this.getOpponentGameboard().printTable();
    this.switchPlayerTurn();
  }
  reset() {
    this.playerOne.gameboard.resetBoard();
    this.playerTwo.gameboard.resetBoard();
    console.log("Gameboard resetted. Starting a new game.");
  }
  printTables() {
    console.log("Player One's table");
    this.playerOne.gameboard.printTable();
    console.log("Player Two's table");
    this.playerTwo.gameboard.printTable();
  }
}

export { Gamecontrol };
