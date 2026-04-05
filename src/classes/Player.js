import Gameboard from "./Gameboard";

export default class Player {
    constructor(name, type = "real") {
        this.name = name;
        this.type = type;   // real or computer
        this.gameboard = new Gameboard();
    }

    // player attack

    attack(enemyBoard, row, col) {
        return enemyBoard.receiveAttack(row, col);
    }

    // logic foc computer , choose a random move

    randomAttack(enemyBoard) {
        if (this.type !== "computer") return;

        let row, col , result;
        do {
            row = Math.floor(Math.random() * 10);
            col = Math.floor(Math.random() * 10);
            result = enemyBoard.receiveAttack(row, col);
        } while (result === "already_attacked");

        return { row, col, result };
    }
}