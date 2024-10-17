import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

it("placeShip",()=>{
    const gameboard=new Gameboard();
    gameboard.placeShip(0,0,3);
    expect(gameboard.board[0][0]).toEqual(new Ship(3));
    expect(gameboard.board[0][1]).toEqual(new Ship(3));
    expect(gameboard.board[0][2]).toEqual(new Ship(3));
});

it('placeShip Vertical',()=>{
    const gameboard=new Gameboard();
    gameboard.placeShip(0,0,3,'vertical');
    expect(gameboard.board[0][0]).toEqual(new Ship(3));
    expect(gameboard.board[1][0]).toEqual(new Ship(3));
    expect(gameboard.board[2][0]).toEqual(new Ship(3));
})

it('receive Attack',()=>{
    const gameboard=new Gameboard();
    expect(gameboard.receiveAttack(1,1)).toBe(false);
    expect(gameboard.missed[0]).toEqual([1,1]);
})

it('showMissedShots',()=>{
    const gameboard=new Gameboard();
    gameboard.receiveAttack(3,3);
    gameboard.receiveAttack(1,2)
    expect(gameboard.showMissedShots()).toEqual([[3,3],[1,2]])
});

it('checkAllShips',()=>{
    const gameboard=new Gameboard();
    gameboard.placeShip(1,1,2);
    gameboard.receiveAttack(1,1);
    gameboard.receiveAttack(1,2);
    expect(gameboard.areAllShipsSunk()).toBe(true);
    gameboard.placeShip(4,4,2,'vertical');
    gameboard.receiveAttack(4,4)
    gameboard.receiveAttack(5,4)
    expect(gameboard.areAllShipsSunk()).toBe(true)
});
