import { Gameboard } from "../src/js/gameboard.js";
import { Ship } from "../src/js/ship.js";

it("placeShip", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(0, 0, 3);
  expect(gameboard.board[0][0]).toEqual(new Ship(3));
  expect(gameboard.board[0][1]).toEqual(new Ship(3));
  expect(gameboard.board[0][2]).toEqual(new Ship(3));
});

it("placeShip Vertical", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(0, 0, 3, "vertical");
  expect(gameboard.board[0][0]).toEqual(new Ship(3));
  expect(gameboard.board[1][0]).toEqual(new Ship(3));
  expect(gameboard.board[2][0]).toEqual(new Ship(3));
});

it("invalid place ship", () => {
  const gameboard = new Gameboard();
  expect(() => gameboard.placeShip(8, 8, 1)).toThrow("Invalid coodinate");
  expect(() => gameboard.placeShip(2, 3, 7)).toThrow(
    "Invalid coodinate: ship extends beyond board horizontally",
  );
  expect(() => gameboard.placeShip(4, 4, 5, "vertical")).toThrow(
    "Invalid coodinate: ship extends beyond board vertically",
  );
  gameboard.placeShip(1, 1, 3);
  expect(() => gameboard.placeShip(1, 2, 2)).toThrow(
    "Cannot place ship: positino already occupied."
  );
});
it("receive Attack", () => {
  const gameboard = new Gameboard();
  expect(gameboard.receiveAttack(1, 1)).toBe(false);
  expect(gameboard.missed[0]).toEqual([1, 1]);
});

it("showMissedShots", () => {
  const gameboard = new Gameboard();
  gameboard.receiveAttack(3, 3);
  gameboard.receiveAttack(1, 2);
  expect(gameboard.showMissedShots()).toEqual([
    [3, 3],
    [1, 2],
  ]);
});

it("checkAllShips", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(1, 1, 2);
  gameboard.receiveAttack(1, 1);
  gameboard.receiveAttack(1, 2);
  expect(gameboard.areAllShipsSunk()).toBe(true);
  gameboard.placeShip(4, 4, 2, "vertical");
  gameboard.receiveAttack(4, 4);
  gameboard.receiveAttack(5, 4);
  expect(gameboard.areAllShipsSunk()).toBe(true);
});

it('isAdjacentToShip',()=>{
    const gameboard=new Gameboard();
    gameboard.placeShip(2,2,2);
    expect(gameboard.isAdjacentToShip(1,1)).toBe(true);
    expect(gameboard.isAdjacentToShip(6,6)).toBe(false);
})