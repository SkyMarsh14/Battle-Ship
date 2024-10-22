import generateGameboard from "../util/util";
import { Gamecontrol } from "../js/gameControl";
import { Player } from "../js/player";

export default function placeShipScreen(playerName) {
  const containerDiv = document.querySelector(".containerDiv");
  containerDiv.innerHTML = "";
  const placeYourShip = document.createElement("h1");
  placeYourShip.classList.add("placeShipTitile");
  placeYourShip.textContent = "Place Your Ships and Get Started!";
  const shipTable = document.createElement("div");
  shipTable.classList.add("shipGrid");
  containerDiv.append(placeYourShip, shipTable);
  generateGameboard(shipTable);
  const randomizeShipsBtn = document.createElement("button");
  randomizeShipsBtn.textContent = "Randomize";
  const startBtn = document.createElement("button");
  startBtn.textContent = "Start Game";
  containerDiv.append(randomizeShipsBtn, startBtn);
  randomizeShipsBtn.classList.add("randomize");
    const bot=new Player('bot',true)
    const playerOne=new Player(playerName)
  const gameboard=new Gamecontrol(playerOne,bot);
  randomizeShipsBtn.addEventListener('click',()=>{
    const shipArr = gameboard.playerOne.gameboard.placeAllShipsRandom();
    markShips(shipArr);
  })
}

function markShips(array){
  const hasMarked=document.querySelectorAll('.hasShip');
  console.log(hasMarked);
  hasMarked.forEach((item)=>{
    item.classList.remove('hasShip')});
  const cells=document.querySelectorAll('.cell')
  for(let i=0;i<array.length;i++){
    const rowNumber=i*array[i].length;
    array[i].forEach((item,index)=>{
      if(item){
      cells[rowNumber+index].classList.add('hasShip');
      }
    })
  }
}