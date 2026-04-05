import "./style.css";
import Player from "./classes/Player";
import { renderBoard, updateStatus } from "./dom";

const player = new Player("Player");
const computer = new Player("Cpu", "computer");

player.gameboard.placeShip(4, 1, 1, false);
player.gameboard.placeShip(3, 3, 5, true);
player.gameboard.placeShip(2, 7, 2, false);

computer.gameboard.placeShip(4, 2, 2, true);
computer.gameboard.placeShip(3, 5, 6, false);
computer.gameboard.placeShip(2, 8, 8, false);

const updateScreen = () => {
    renderBoard("player-board", player.gameboard, false);
    renderBoard("computer-board", computer.gameboard, true);
};

const handleAttack = (e) => {
    if (!e.target.classList.contains("cell")) return;

    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);

    const attackResult = player.attack(computer.gameboard, row, col);

    if (attackResult === "already_attacked") return;

    updateScreen();

    if (computer.gameboard.areAllShipsSunk()) {
        updateStatus("CONGRATULATIONS! You have destroyed the enemy fleet!");
        document.getElementById("computer-board").classList.add("disabled");
        return;
    }

    updateStatus("The enemy is attacking!");
    document.getElementById("computer-board").classList.add("disabled");

    setTimeout( () => {
        computer.randomAttack(player.gameboard());
        updateScreen();

        if (player.gameboard.areAllShipsSunk()){
            updateStatus("DISASTER! The enemy has destroyed your fleet!");
            return;
        }

        updateStatus("Your turn. Attack!");
        document.getElementById("computer-board").classList.remove("disabled");

    }, 600);
};

document.getElementById("computer-board").addEventListener("click", handleAttack);

updateScreen();