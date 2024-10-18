/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/player.js */ \"./src/js/player.js\");\n/* harmony import */ var _js_gameControl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/gameControl.js */ \"./src/js/gameControl.js\");\n\n\n\nconst playerOne = new _js_player_js__WEBPACK_IMPORTED_MODULE_0__.Player(\"Player One\");\nconst playerTwo = new _js_player_js__WEBPACK_IMPORTED_MODULE_0__.Player(\"Player two\");\nconst gameA = new _js_gameControl_js__WEBPACK_IMPORTED_MODULE_1__.Gamecontrol(playerOne, playerTwo);\nconsole.log('hello')\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/js/gameControl.js":
/*!*******************************!*\
  !*** ./src/js/gameControl.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Gamecontrol: () => (/* binding */ Gamecontrol)\n/* harmony export */ });\nclass Gamecontrol {\n  constructor(playerOne, playerTwo) {\n    this.playerOne = playerOne;\n    this.playerTwo = playerTwo;\n    this.activePlayer = playerOne;\n  }\n\n  getActivePlayer = () => this.activePlayer;\n  switchPlayerTurn() {\n    this.activePlayer =\n      this.getActivePlayer() === this.playerOne\n        ? this.playerTwo\n        : this.playerOne;\n  }\n\n  getOpponentGameboard() {\n    return this.activePlayer === this.playerOne\n      ? this.playerTwo.gameboard\n      : this.playerOne.gameboard;\n  }\n  attackOpponent(x, y) {\n    const attack = this.activePlayer.attack(this.getOpponentGameboard(), x, y);\n    if (attack) {\n      console.log(\"Attack Successful! You can play until you miss the shot.\");\n      if (this.getOpponentGameboard().areAllShipsSunk()) {\n        console.log(`${this.activePlayer} has won the game!`);\n      }\n    }\n    console.log(\"You missed the shot! Switching Player.\");\n    this.getOpponentGameboard().printTable();\n    this.switchPlayerTurn();\n  }\n  reset() {\n    this.playerOne.gameboard.resetBoard();\n    this.playerTwo.gameboard.resetBoard();\n    console.log(\"Gameboard resetted. Starting a new game.\");\n  }\n}\n\n\n\n//# sourceURL=webpack://battleship/./src/js/gameControl.js?");

/***/ }),

/***/ "./src/js/gameboard.js":
/*!*****************************!*\
  !*** ./src/js/gameboard.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Gameboard: () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ \"./src/js/ship.js\");\n\n\nclass Gameboard {\n  constructor(size = 7) {\n    this.size = size;\n    this.board = Array.from({ length: size }, () => new Array(size).fill(null));\n    this.missed = [];\n    this.ships = [];\n  }\n  getShipCoodinate(row, col, shipSize, direction) {\n    if (row > this.size - 1 || col > this.size - 1) {\n      throw new Error(\"Invalid coodinate\");\n    }\n    const shipCoodinates = [];\n    if (direction === \"horizontal\") {\n      if (col + shipSize > this.board[0].length) {\n        throw new Error(\n          \"Invalid coodinate: ship extends beyond board horizontally\",\n        );\n      }\n      for (let i = 0; i <= shipSize - 1; i++) {\n        shipCoodinates.push([row, col + i]);\n      }\n    } else if (direction === \"vertical\") {\n      if (row + shipSize > this.board.length) {\n        throw new Error(\n          \"Invalid coodinate: ship extends beyond board vertically\",\n        );\n      }\n      for (let i = 0; i <= shipSize - 1; i++) {\n        shipCoodinates.push([row + i, col]);\n      }\n    }\n    return shipCoodinates;\n  }\n  placeShip(row, col, shipSize, direction = \"horizontal\") {\n    const shipCoodinates = this.getShipCoodinate(row, col, shipSize, direction);\n    const ship = new _ship_js__WEBPACK_IMPORTED_MODULE_0__.Ship(shipSize);\n    if (shipCoodinates.some(([nx, ny]) => this.isAdjacentToShip(nx, ny))) {\n      throw new Error(\"Cannot place ship: positino already occupied.\");\n    }\n    shipCoodinates.forEach(([x, y]) => {\n      this.board[x][y] = ship;\n    });\n    this.ships.push([row, col]);\n  }\n  receiveAttack(row, col) {\n    const ship = this.board[row][col];\n    if (ship) {\n      ship.hit();\n      return true;\n    }\n    this.missed.push([row, col]);\n    return false;\n  }\n  showMissedShots() {\n    return this.missed;\n  }\n  areAllShipsSunk() {\n    //check if there's any ship that is not sunk.\n    const sunk = (x, y) => this.board[x][y].isSunk();\n    return !this.ships.some(([nx, ny]) => {\n      return !sunk(nx, ny);\n    });\n  }\n  printTable() {\n    console.table(this.board);\n  }\n  isAdjacentToShip(x, y) {\n    const naighbors = [\n      [x + 1, y],\n      [x - 1, y],\n      [x, y + 1],\n      [x, y - 1],\n      [x + 1, y + 1],\n      [x - 1, y - 1],\n      [x + 1, y - 1],\n      [x - 1, y + 1],\n    ];\n    return naighbors.some(([nx, ny]) => {\n      if (\n        nx < 0 ||\n        nx >= this.board.length ||\n        ny < 0 ||\n        ny >= this.board[0].length\n      ) {\n        return false;\n      }\n      return this.board[nx][ny] !== null;\n    });\n  }\n  placeShipRandom(shipSize) {\n    //get 1 or 2 to decide direction\n    const direction = Math.random() > 0.5 ? \"horizontal\" : \"vertical\";\n    const col = Math.floor(Math.random() * 7);\n    const row = Math.floor(Math.random() * 7);\n    try {\n      this.board.placeShip(row, col, shipSize, direction);\n      return;\n    } catch {\n      this.placeShipRandom(shipSize);\n    }\n  }\n  placeAllShipsRandom() {\n    this.resetBoard();\n    this.placeShipRandom(3);\n    this.placeShipRandom(3);\n    this.placeShipRandom(5);\n    this.placeShipRandom(4);\n    this.placeShipRandom(2);\n  }\n  resetBoard() {\n    this.board = new Gameboard();\n  }\n}\n\n\n\n//# sourceURL=webpack://battleship/./src/js/gameboard.js?");

/***/ }),

/***/ "./src/js/player.js":
/*!**************************!*\
  !*** ./src/js/player.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Player: () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/js/gameboard.js\");\n\n\nclass Player {\n  constructor(name = \"Player\", computer = false) {\n    this.name = name;\n    this.computer = computer;\n    this.gameboard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard();\n  }\n  attack({ gameboard }, x, y) {\n    return gameboard.receiveAttack(x, y);\n  }\n}\n\n\n\n//# sourceURL=webpack://battleship/./src/js/player.js?");

/***/ }),

/***/ "./src/js/ship.js":
/*!************************!*\
  !*** ./src/js/ship.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Ship: () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\n  constructor(length) {\n    this.length = length;\n    this.hits = 0;\n  }\n  isSunk() {\n    return this.length === this.hits;\n  }\n\n  hit() {\n    ++this.hits;\n  }\n}\n\n\n\n\n//# sourceURL=webpack://battleship/./src/js/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;