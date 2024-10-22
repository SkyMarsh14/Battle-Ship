import "./styles.css";
import { Player } from "./js/player.js";
import { Gamecontrol } from "./js/gameControl.js";
import loadFirstPage from "./dom/titlePage.js";
import placeShipScreen from "./dom/placeShip.js";

let game;

document.addEventListener("DOMContentLoaded", () => {
  loadFirstPage();
});
