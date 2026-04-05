import Player from '../src/classes/Player';
import Gameboard from '../src/classes/Gameboard';

describe("Player Class", () => {
  test("each player has their own gameboard", () => {
    const player = new Player("Andrew");
    expect(player.gameboard).toBeInstanceOf(Gameboard);
  });

  test("computer player makes a random valid move", () => {
    const computer = new Player('CPU', 'computer');
    const enemyBoard = new Gameboard();
    
    const move = computer.randomAttack(enemyBoard);
    expect(move.row).toBeGreaterThanOrEqual(0);
    expect(move.row).toBeLessThan(10);
    expect(move.result).not.toBe("already_attacked");
  });
});