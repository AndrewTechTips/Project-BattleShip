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

    rotateBtn.addEventListener("click", () => {
        isVertical = !isVertical;
        rotateBtn.textContent = `Rotate Ships: ${isVertical ? 'Vertical' : 'Horizontal'}`;
        renderFleet();
    });

    playerBoardElement.addEventListener("dragover", (e) => {
        e.preventDefault();
        if (e.target.classList.contains("cell")) {
            e.target.classList.add("drag-over");
        }
    });

    playerBoardElement.addEventListener("dragleave", (e) => {
        if (e.target.classList.contains("cell")) {
            e.target.classList.remove("drag-over");
        }
    });

    playerBoardElement.addEventListener("drop", (e) => {
        e.preventDefault();
        if (e.target.classList.contains("cell")) {
            e.target.classList.remove("drag-over");

            const row = parseInt(e.target.dataset.row);
            const col = parseInt(e.target.dataset.col);

            if (player.gameboard.canPlaceShip(draggedShipLength, row, col, isVertical)) {
                player.gameboard.placeShip(draggedShipLength, row, col, isVertical);

                const shipIndex = parseInt(draggedShipElement.dataset.index);
                shipsToPlace.splice(shipIndex, 1);

                updateScreenCallback();
                renderFleet();

                if (shipsToPlace.length === 0) {
                    fleetContainer.innerHTML = "<h3>All ships placed. Ready for battle!</h3>"
                    enableStartGameCallback();
                }
            } else {
                console.log("Invalid placement!");
            }
        }
    });

    renderFleet();

}