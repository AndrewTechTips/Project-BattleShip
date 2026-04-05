export default class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    }

    // func to hit a ship
    
    hit() {
        if (this.hits < this.length) {
            this.hits++;
        }
        this.checkIfSunk();
    }

    // check and update the ship s status

    checkIfSunk() {
        if (this.hits >= this.length) {
            this.sunk = true;
        }
    }

    isSunk() {
        return this.sunk;
    }
}