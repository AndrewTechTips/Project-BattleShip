import { renderBoard } from "./dom"

export const initDragAndDrop = (player, updateScreenCallback, enableStartGameCallback) => {
    const fleetContainer = document.getElementById("fleet-container");
    const playerBoardElement = document.getElementById("player-board");
    const rotateBtn = document.getElementById("rotate-btn");

    let isVertical = false;
    let draggedShipLength = 0;
    let draggedShipElement = null;

    const shipsToPlace = [5, 4, 3, 3, 2];

    const renderFleet = () => {
        fleetContainer.innerHTML = "";

        shipsToPlace.forEach((length, index) => {
            const shipDiv = document.createElement("div");
            shipDiv.classList.add("ship-draggable");
            if (isVertical) shipDiv.classList.add("vertical");

            shipDiv.draggable = true;
            shipDiv.dataset.length = length;
            shipDiv.dataset.index = index;

            for (let i = 0; i < length; i++) {
                const segment = document.createElement("div");
                segment.classList.add("ship-segment");
                shipDiv.appendChild(segment);
            }

            shipDiv.addEventListener("dragstart", (e) => {
                draggedShipLength = parseInt(e.target.dataset.length);
                draggedShipElement = e.target;
                setTimeout(() => e.target.style.opacity = "0.5", 0);
            });

            shipDiv.addEventListener("dragend", (e) => e.target.style.opacity = "1");

            fleetContainer.appendChild(shipDiv);

        });
    };

    


}