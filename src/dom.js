export const renderBoard = (boardElementId, gameboard, isEnemy = false) => {
    const boardDiv = document.getElementById(boardElementId);
    boardDiv.innerHTML = "";        // clear the html before rendering 

    const grid = gameboard.board;

    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 10; c++){
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");

            cellDiv.dataset.row = r;
            cellDiv.dataset.col = c;

            const cellData = grid[r][c];

            if (cellData === "hit") {
                cellDiv.classList.add("hit");
            } else if (cellData === "miss") {
                cellDiv.classList.add("miss");
            } else if (cellData !== null && !isEnemy) {
                cellDiv.classList.add("ship");
            }

            boardDiv.appendChild(cellDiv);
        }
    }
};

export const updateStatus = (message) => {
    document.getElementById("status-display").textContent = message;
};