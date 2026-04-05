import Ship from "./Ship.js"

export default class Gameboard {
    constructor() {
        this.size = 10;
        this.board = Array.from({ length: this.size}, () => Array(this.size).fill(null));
        this.missedAttacks = [];
        this.ships = [];
    }

    placeShip(length, row, col, isVertical = false) {
        const newShip = new Ship(length);

        for (let i = 0; i < length; i++) {
            if (isVertical) {
                this.board[row + i][col] = newShip;
            } else {
                this.board[row][col + i] = newShip;
            }
        }

        this.ships.push(newShip);
    }

    receiveAttack(row, col) {
        const target = this.board[row][col];

        // if place is null it means it s a miss
        if (target === null) {
            this.missedAttacks.push({ row, col });
            this.board[row][col] = "miss";      //mark on the table that this place is already hit
            
            return "miss";
        } else if (typeof target === "object" && target != null) {
            target.hit();
            this.board[row][col] = "hit";

            return "hit";
        }

        return "already_attacked";
    }

    areAllShipsSunk() {
        // if we have no ships on the board, they are obviously not all sunk (the game has not started)
        if (this.ships.length === 0) return false;

        return this.ships.every(ship => ship.isSunk());
    }
}