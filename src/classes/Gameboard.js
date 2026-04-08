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

    reset() {
        this.board = Array.from({ length: this.size}, () => Array(this.size).fill(null));
        this.missedAttacks = [];
        this.ships = [];
    }

    placeShipsRandomly() {
        this.reset();
        const shipLengths = [5, 4, 3, 3, 2];

        shipLengths.forEach(length => {
            let placed = false;

            while(!placed) {
                const isVertical = Math.random() > 0.5;
                const row = Math.floor(Math.random() * 10);
                const col = Math.floor(Math.random() * 10);

                if (this.canPlaceShip(length, row, col, isVertical)) {
                    this.placeShip(length, row, col, isVertical);
                    placed = true;
                }
            }

        });
    }

    getAliveShipsCount() {
        return this.ships.filter(ship => !ship.isSunk()).length;
    }

    canPlaceShip(length, row, col, isVertical) {
        for (let i = 0; i < length; i++) {
            const r = isVertical ? row + i : row;
            const c = isVertical ? col : col + i;

            if (r >= 10 || c >= 10 || this.board[r][c] !== null) return false;
        
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    const checkRow = r + dr;
                    const checkCol = c + dc;

                    if (checkRow >= 0 && checkRow < 10 && checkCol >= 0 && checkCol < 10) {
                        if (this.board[checkRow][checkCol] !== null) {
                            return false;
                        }
                    }
                }
            }
        }

        return true;
    }
}