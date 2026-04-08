import "./style.css";
import Player from "./classes/Player";
import { renderBoard, updateStatus } from "./dom";
import { initDragAndDrop } from "./dragDrop";
import { getCpuHitMessage, getCpuMissMessage, getRandomHitMessage, getRandomMissMessage } from "./messages";

const player = new Player("Player");
const computer = new Player("CPU", "computer");
let gameIsRunning = false;


const startGameBtn = document.getElementById('start-game-btn');
const randomizeBtn = document.getElementById('randomize-btn');
const resetBtn = document.getElementById('reset-btn');
const computerBoardDiv = document.getElementById('computer-board');
const fleetContainer = document.getElementById("fleet-container");

const updateScreen = () => {
    renderBoard("player-board", player.gameboard, false);
    renderBoard("computer-board", computer.gameboard, true);

    document.getElementById("player-counter").textContent = `(${player.gameboard.getAliveShipsCount()} left)`;
    document.getElementById("cpu-counter").textContent = `(${computer.gameboard.getAliveShipsCount()} left)`

};

const enableStartGame = () => {
    startGameBtn.disabled = false;
};

// funct for soft reset (without reload the page)

const resetGameLogic = () => {
    gameIsRunning = false;

    player.gameboard.reset();
    computer.gameboard.reset();

    controlsContainer.style.display = "flex";
    fleetContainer.style.display = "flex";
    resetBtn.style.display = "none";
    computerBoardDiv.classList.add("disabled");
    startGameBtn.disabled = true;

    updateStatus("Place your fleet, Commander.");
    updateScreen();

    initDragAndDrop(player, updateScreen, enableStartGame);
}

resetGameLogic();

// randomize

randomizeBtn.addEventListener("click", () => {
    player.gameboard.placeShipsRandomly();
    fleetContainer.style.display = "none";
    updateScreen();
    enableStartGame();
});

// start game
const controlsContainer = document.querySelector(".controls");

startGameBtn.addEventListener("click", () => {
    if (gameIsRunning) return;

    gameIsRunning = true;
    computer.gameboard.reset();
    computer.gameboard.placeShipsRandomly();
    updateScreen();

    updateStatus("Game started! Good luck, Commander.");

    // hide the setup btns 
    controlsContainer.style.display = "none";   
    fleetContainer.style.display = "none"; 
    computerBoardDiv.classList.remove("disabled");
    resetBtn.style.display = "inline-block";
});

// reset btn

resetBtn.addEventListener("click", resetGameLogic);


const handleAttack = (e) => {
    if (!e.target.classList.contains("cell") || !gameIsRunning) return;

    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);

    const attackResult = player.attack(computer.gameboard, row, col);
    if (attackResult === "already_attacked") return;

    updateScreen();

    if (attackResult === "hit") {
        updateScreen(getRandomHitMessage());
    } else {
        updateStatus(getRandomMissMessage());
    }

    if (computer.gameboard.areAllShipsSunk()) {
        updateStatus("VICTORY! Enemy fleet destroyed!");
        gameIsRunning = false;
        computerBoardDiv.classList.add("disabled");
        return;
    }
    computerBoardDiv.classList.add("disabled");

    setTimeout( () => {
        const cpuMove = computer.randomAttack(player.gameboard);
        updateScreen();

        if (cpuMove.result === "hit") {
            updateStatus(getCpuHitMessage());
        } else {
            updateStatus(getCpuMissMessage());
        }

        if (player.gameboard.areAllShipsSunk()) {
            updateStatus("DEFEAT! Your fleet was destroyed.");
            gameIsRunning = false;
            return;
        }

        computerBoardDiv.classList.remove("disabled");

    }, 800);
};

computerBoardDiv.addEventListener("click", handleAttack);