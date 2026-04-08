import "./style.css";
import Player from "./classes/Player";
import { renderBoard, updateStatus } from "./dom";
import { initDragAndDrop } from "./dragDrop";
import { getCpuHitMessage, getCpuMissMessage, getRandomHitMessage, getRandomMissMessage } from "./messages";

const player = new Player("Player");
const computer = new Player("CPU", "computer");
let gameIsRunning = false;

const updateScreen = () => {
    renderBoard("player-board", player.gameboard, false);
    renderBoard("computer-board", computer.gameboard, true);
};

const enableStartGame = () => {
    document.getElementById("start-game-btn").disabled = false;
};

initDragAndDrop(player, updateScreen, enableStartGame);
updateScreen();

const startGameBtn = document.getElementById('start-game-btn');
const randomizeBtn = document.getElementById('randomize-btn');
const resetBtn = document.getElementById('reset-btn');
const computerBoardDiv = document.getElementById('computer-board');

// randomize

randomizeBtn.addEventListener("click", () => {
    player.gameboard.placeShipsRandomly();
    document.getElementById("fleet-container").innerHTML = "";
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
    computerBoardDiv.classList.remove("disabled");
    resetBtn.style.display = "block";
});

// reset btn

resetBtn.addEventListener("click", () => {
    window.location.reload();
});


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