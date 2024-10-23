import { markShips, generateGameboard, markAttackedCell } from "./../util/util";

export default function startGame(gameControl) {
  console.log(gameControl);
  const containerDiv = document.querySelector(".containerDiv");
  containerDiv.classList.add("twoBoards");
  containerDiv.innerHTML = "";
  const playerOneGrid = document.createElement("div");
  const playerTwoGrid = document.createElement("div");
  playerOneGrid.classList.add("shipGrid");
  playerTwoGrid.classList.add("shipGrid");
  playerOneGrid.dataset.player = "playerOne";
  playerTwoGrid.dataset.player = "playerTwo";
  containerDiv.append(playerOneGrid, playerTwoGrid);
  generateGameboard(playerOneGrid);
  generateGameboard(playerTwoGrid);
  const playerOneBoard = gameControl.playerOne.gameboard.board;
  markShips(playerOneBoard, playerOneGrid);
  markAttackedCell(playerOneGrid, gameControl);
  markAttackedCell(playerTwoGrid, gameControl);
}
