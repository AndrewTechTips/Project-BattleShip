import Gameboard from '../src/classes/Gameboard';

describe("Gameboard Class", () => {
  let board;

  beforeEach(() => {
    board = new Gameboard();
  });

  test("places a ship horizontally", () => {
    board.placeShip(3, 0, 0, false); 
    expect(board.board[0][0]).toBeInstanceOf(Object);
    expect(board.board[0][1]).toBeInstanceOf(Object);
    expect(board.board[0][2]).toBeInstanceOf(Object);
    
    expect(board.board[0][3]).toBeNull(); 
  });

  test("receives an attack and hits a ship", () => {
    board.placeShip(2, 2, 2, true); 
    board.receiveAttack(2, 2);
    expect(board.board[2][2]).toBe('hit');
    expect(board.ships[0].hits).toBe(1); 
  });

  test("records a missed attack", () => {
    board.receiveAttack(5, 5);
    expect(board.board[5][5]).toBe('miss');
    expect(board.missedAttacks.length).toBe(1);
    expect(board.missedAttacks[0]).toEqual({ row: 5, col: 5 });
  });

  test("reports when all ships are sunk", () => {
    board.placeShip(1, 0, 0, false);
    board.placeShip(2, 3, 3, false); 
    
    board.receiveAttack(0, 0); 
    expect(board.areAllShipsSunk()).toBe(false);

    board.receiveAttack(3, 3);
    board.receiveAttack(3, 4);
    
    expect(board.areAllShipsSunk()).toBe(true);
  });
});