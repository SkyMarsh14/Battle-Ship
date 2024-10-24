function generateGameboard(container) {
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.cellNumber = i;
    container.append(cell);
  }
}

function markShips(array, cellContainer) {
  const hasMarked = cellContainer.querySelectorAll(".hasShip");
  hasMarked.forEach((item) => {
    item.classList.remove("hasShip");
  });
  const cells = cellContainer.querySelectorAll(".cell");
  for (let i = 0; i < array.length; i++) {
    const rowNumber = i * array[i].length;
    array[i].forEach((item, index) => {
      if (item) {
        cells[rowNumber + index].classList.add("hasShip");
      }
    });
  }
}

function markAttackedCell(playerGrid, gameControl) {
  playerGrid.addEventListener("click", (e) => {
    const gameLog = document.querySelector(".gameLog");
    gameLog.textContent = "";
    e.stopPropagation();
    const player = playerGrid.dataset.player;
    const cellIndex = e.target.dataset.cellNumber;
    if (isNaN(cellIndex)) return;
    const x = cellIndex % 10;
    const y = Math.floor(cellIndex / 10);
    try {
      if (gameControl[player].attack(x, y)) {
        e.target.classList.add("gotHit");

        gameLog.textContent = "You hit a target, your turn again!";
        return;
      } else {
        e.target.classList.add("missed");
      }
    } catch {
      alert("The selected cell has already been attacked.");
      return;
    }
    const playerOneBoard = document.querySelector(`[data-player="playerOne"]`);
    const grid = playerOneBoard.querySelectorAll(".cell");

    const boardInfo = gameControl.playerOne.gameboard.botAttack();
    boardInfo.miss.forEach((item) => {
      grid[item[0] + item[1] * 10].classList.add("missed");
    });
    boardInfo.hit.forEach((item) => {
      grid[item[0] + item[1] * 10].classList.add("gotHit");
    });
    let message;
    if (boardInfo.log.length > 1) {
      message = `The bot hit ${boardInfo.log.length - 1} of your ships!`;
    } else {
      message = `The bot attacked X:${boardInfo.log[0][0]} Y:${boardInfo.log[0][1]}`;
    }
    if (boardInfo.allShipSunk) {
      message = "Bot has won the game";
    }
    document.querySelector(".gameLog").textContent = message;
  });
}

export { generateGameboard, markShips, markAttackedCell };
