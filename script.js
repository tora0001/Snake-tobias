"use strict";

window.addEventListener("load", start);

// ****** CONTROLLER ******
// #region controller

function start() {
  console.log(`Javascript kører`);

  document.addEventListener("keydown", keyDown);

  spawnFood();

  // start ticking
  tick();
}

let timer;

function spawnFood() {
  food.row = Math.floor(Math.random() * 9);
  food.col = Math.floor(Math.random() * 9);
  writeToCell(food.row, food.col, 2);
}

function keyDown(event) {
  switch (event.key) {
    case "ArrowLeft":
    case "a":
      direction = "left";
      break;
    case "ArrowRight":
    case "d":
      direction = "right";
      break;
    case "ArrowUp":
    case "w":
      direction = "up";
      break;
    case "ArrowDown":
    case "s":
      direction = "down";
      break;
  }
}

function tick() {
  // setup next tick
  timer = setTimeout(tick, 300);

  for (const part of queue) {
    writeToCell(part.row, part.col, 0);
  }

  const head = {
    row: queue[queue.length - 1].row,
    col: queue[queue.length - 1].col,
  };

  switch (direction) {
    case "left":
      head.col--;
      if (head.col < 0) {
        head.col = 9;
      }
      break;
    case "right":
      head.col++;
      if (head.col > 9) {
        head.col = 0;
      }
      break;
    case "up":
      head.row--;
      if (head.row < 0) {
        head.row = 9;
      }
      break;
    case "down":
      head.row++;
      if (head.row > 9) {
        head.row = 0;
      }
      break;
  }

  for (const segment of queue) {
    if (head.row === segment.row && head.col === segment.col) {
      queue.length = 0;
      clearTimeout(timer);
      alert("Du tabte... Refresh for at genstarte");
    }
  }

  queue.push(head);

  queue.shift();

  for (const part of queue) {
    writeToCell(part.row, part.col, 1);
  }

  if (food.row == head.row && food.col == head.col) {
    writeToCell(food.row, food.col, 0);
    queue.push(head);
    setTimeout(spawnFood, 1000);
  }

  // display the model in full
  displayBoard();
}

// #endregion controller

// ****** MODEL ******
// #region model
const model = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const queue = [
  {
    row: 5,
    col: 7,
  },
  {
    row: 5,
    col: 6,
  },
  {
    row: 5,
    col: 5,
  },
];

let food = {
  row: Math.floor(Math.random() * 9),
  col: Math.floor(Math.random() * 9),
};

let direction = "left";

function writeToCell(row, col, value) {
  model[row][col] = value;
}

function readFromCell(row, col) {
  return model[row][col];
}

// #endregion model

// ****** VIEW ******
// #region view

function displayBoard() {
  const cells = document.querySelectorAll("#grid .cell");
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const index = row * 10 + col;

      switch (readFromCell(row, col)) {
        case 0:
          cells[index].classList.remove("player", "goal");
          break;
        case 1: // Note: doesn't remove goal if previously set
          cells[index].classList.add("player");
          break;
        case 2: // Note: doesn't remove player if previously set
          cells[index].classList.add("goal");
          break;
      }
    }
  }
}

// #endregion view
