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
    const player=playerGrid.dataset.player;
    const cellIndex = e.target.dataset.cellNumber;
    const x = cellIndex % 10;
    const y = Math.floor(cellIndex / 10);
    if(gameControl[player].attack(x,y)){
      e.target.classList.add('gotHit')
    }else{
      e.target.classList.add('missed')
    }
    attackRandomly(gameControl.playerOne);
  });
}

function attackRandomly(targetPlayer){
  const x = Math.floor(Math.random()*10);
  const y = Math.floor(Math.random()*10);
  const validate=([x,y])=>{
    return targetPlayer.gameboard.attacked.some((item)=>item[0]===x&&item[1]===y)
  }
  if(validate([x,y])) attackRandomly(targetPlayer);
  const playerOneBoard=document.querySelector(`[data-player="playerOne"]`)
  const grid=playerOneBoard.querySelectorAll('.cell')
  if(targetPlayer.attack(x,y)){
  console.log(`${targetPlayer.name} has attacked ${[x,y]}`);
  grid[x+y*10].classList.add('gotHit');
  }else{grid[x+y*10].classList.add('missed');
}
}
export { generateGameboard, markShips, markAttackedCell };
