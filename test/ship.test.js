import {Ship} from "../src/ship.js"

it("test",()=>{
    const submarine=new Ship(3);
    submarine.hit();
    submarine.hit();
    submarine.hit();
    expect((submarine.hits)).toBe(3);
    expect((submarine.isSunk())).toBe(true);
})