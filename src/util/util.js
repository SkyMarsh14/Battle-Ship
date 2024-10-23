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
    e.stopPropagation();
    const player = playerGrid.dataset.player;
    const cellIndex = e.target.dataset.cellNumber;
    if(isNaN(cellIndex)) return;
    const x = cellIndex % 10;
    const y = Math.floor(cellIndex / 10);
    if (gameControl[player].attack(x, y)) {
      e.target.classList.add("gotHit");
      console.log('You hit a target, your turn again!')
      return;
    } else {
      e.target.classList.add("missed");
    }
    const playerOneBoard = document.querySelector(`[data-player="playerOne"]`);
const grid = playerOneBoard.querySelectorAll(".cell");

    const boardInfo= gameControl.playerOne.gameboard.botAttack();
    boardInfo.miss.forEach((item)=>{
      grid[item[0]+item[1]*10].classList.add('missed')
    });
    boardInfo.hit.forEach((item)=>{
      grid[item[0]+item[1]*10].classList.add('gotHit')
    })
  });
}

export { generateGameboard, markShips, markAttackedCell };
