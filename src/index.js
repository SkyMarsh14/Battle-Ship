import "./styles.css";
import { Player } from "./js/player.js";
import { Gamecontrol } from "./js/gameControl.js";
import loadFirstPage from "./dom/titlePage.js";

const playerOne = new Player("Player One");
const playerTwo = new Player("Player two");
const gameA = new Gamecontrol(playerOne, playerTwo);
gameA.printTables();
gameA.playerTwo.gameboard.placeShip(1, 1, 1);
gameA.attackOpponent(1, 1);

document.addEventListener("DOMContentLoaded", () => {
  loadFirstPage();
  const startGameBtn=document.querySelector('.startGameBtn');
  startGameBtn.addEventListener('submit',(e)=>{
    e.preventDefault();
  })
});
