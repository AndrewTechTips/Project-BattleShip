import Ship from "../src/classes/Ship";

describe("Ship Class", () => {
    let myShip;

    beforeEach(() => {
        myShip = new Ship(3);
    });

    test("creates a ship with correct length", () => {
        expect(myShip.length).toBe(3);
    });

    test("increases hits when hit() is called", () => {
        myShip.hit();
        expect(myShip.hits).toBe(1);
    });

    test("isSunk() returns false if hits are less than length", () => {
        myShip.hit();
        myShip.hit();
        expect(myShip.isSunk()).toBe(false);
    });

    test("isSunk() returns true when hits equal length", () => {
        myShip.hit();
        myShip.hit();
        myShip.hit();
        expect(myShip.isSunk()).toBe(true);
    });
    
});