# Project-BattleShip<div align="center">

  <h1>🚢 BattleShip</h1>

  <p>
    A fully playable <strong>Battleship game</strong> built in the browser.<br />
    Drag and drop your fleet, randomize your formation, then battle a CPU opponent —
    all powered by <strong>OOP JavaScript</strong>, <strong>Webpack</strong>, and tested with <strong>Jest</strong>.
  </p>

  <p>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
    <img src="https://img.shields.io/badge/JavaScript-OOP-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
    <img src="https://img.shields.io/badge/Webpack-5-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black" alt="Webpack" />
    <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest" />
    <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="npm" />
  </p>

  <h3>
    <a href="https://andrewtechtips.github.io/Project-BattleShip/">🎮 PLAY NOW</a>
  </h3>

</div>

<br />

---

## ✨ Features

* **🖱️ Drag & Drop Placement:** Drag ships from the fleet panel onto your board — rotate between horizontal and vertical with one click.
* **🎲 Randomize Fleet:** Instantly place all ships in valid random positions with a single button.
* **🤖 CPU Opponent:** The computer attacks with a random valid move each turn, never hitting the same square twice.
* **💬 Dynamic Messages:** Hit and miss messages are pulled randomly from a pool — each battle feels different.
* **🔄 Soft Reset:** Full game reset without reloading the page — restores the board, UI, and drag & drop in one click.
* **🎨 Naval Dark UI:** Neon blue/red on deep navy with glowing cells, hit/miss markers, and ship counters per side.

---

## 🧠 Architecture

The game is split into three independent classes and a set of UI modules, keeping game logic completely separate from the DOM.

### `Ship` — Tracks damage
```javascript
hit()        // increments hits, checks if sunk
isSunk()     // returns true when hits >= length
```

### `Gameboard` — Manages the 10×10 grid
```javascript
placeShip(length, row, col, isVertical)  // places a ship on the board
receiveAttack(row, col)                  // returns "hit", "miss", or "already_attacked"
canPlaceShip(...)                        // validates position + 1-cell gap between ships
placeShipsRandomly()                     // fills the board with a valid random fleet
areAllShipsSunk()                        // checks win condition
```

### `Player` — Human or CPU
```javascript
attack(enemyBoard, row, col)   // delegates to receiveAttack
randomAttack(enemyBoard)       // loops until a valid square is found
```

### Drag & Drop (`dragDrop.js`)
Ships are rendered as draggable elements. On `drop`, `canPlaceShip()` validates the target square before committing — invalid placements are silently rejected.

---

## 📁 Project Structure

```
Project-BattleShip/
├── src/
│   ├── classes/
│   │   ├── Ship.js           # Ship class — hit tracking & sunk status
│   │   ├── Gameboard.js      # Board logic — placement, attacks, validation
│   │   └── Player.js         # Player & CPU logic
│   ├── dom.js                # Renders boards & updates status display
│   ├── dragDrop.js           # Drag & drop ship placement logic
│   ├── messages.js           # Random hit/miss message pools
│   ├── index.js              # App entry — event listeners & game loop
│   ├── index.html            # HTML shell
│   └── style.css             # Dark naval theme
├── tests/
│   ├── Ship.test.js
│   ├── Gameboard.test.js
│   └── Player.test.js
├── webpack.config.js
├── babel.config.js
├── package.json
└── README.md
```

---

## 🧪 Tests

Unit tests cover all three core classes using Jest:

| Class | What's tested |
|-------|--------------|
| `Ship` | Hit tracking, sunk detection |
| `Gameboard` | Ship placement, hit/miss recording, win condition |
| `Player` | Gameboard ownership, CPU random valid move |

Run them with:
```bash
npm test
```

---

## 🚀 Getting Started

1. **Clone the repository:**
    ```bash
    git clone https://github.com/AndrewTechTips/Project-BattleShip.git
    cd Project-BattleShip
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Start the dev server:**
    ```bash
    npm start
    ```

---

## 📬 Contact

* **LinkedIn:** [Andrei Condrea](https://www.linkedin.com/in/andrei-condrea-b32148346)
* **Email:** condrea.andrey777@gmail.com

<p align="center">
  <i>"All ships are visible on the radar — except the ones that matter." 🎯</i>
</p>