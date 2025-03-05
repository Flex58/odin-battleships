import gameControllerAI from "../gameController";
import clearDisplay from "./clearDisplay";

const renderSetUp = (player) => {
  const board = player.gameboard.board;
  const content = document.querySelector("#content");

  const container = document.createElement("div");
  container.id = "opponent";
  content.appendChild(container);

  const emptyDiv = document.createElement("div");
  emptyDiv.id = "empty";
  container.appendChild(emptyDiv);

  let mode = "vert";

  const switchMode = () => {
    mode = mode == "vert" ? "hori" : "vert";
  };

  const shipContainer = document.createElement("div");
  shipContainer.id = "shipContainer";
  content.appendChild(shipContainer);

  for (let ship in player.ships) {
    const dragDiv = document.createElement("div");
    dragDiv.textContent = ship;
    dragDiv.id = ship;
    dragDiv.draggable = true;
    dragDiv.addEventListener("dragstart", (e) => {
      if (e.ctrlKey) switchMode();
      e.dataTransfer.setData("ship", e.target.id);
      e.dataTransfer.setData("length", player.ships[ship].length);
    });
    shipContainer.appendChild(dragDiv);
  }

  container.addEventListener("drop", (e) => {
    if (!e.target.closest(".cell")) return;
    e.preventDefault();
    const target = e.target.closest(".cell");
    const data = e.dataTransfer.getData("ship");
    try {
      player.gameboard.place(
        player.ships[data],
        Number(target.dataset.x),
        Number(target.dataset.y),
        mode,
      );
      delete player.ships[data];
      clearDisplay("#content");
      renderSetUp(player);
    } catch {}
  });

  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  });

  container.addEventListener("dragenter", (e) => {
    let test = document.querySelectorAll(".drag");
    test.forEach((t) => {
      t.classList.remove("drag");
    });

    if (!e.target.closest(".cell")) return;

    const length = e.dataTransfer.getData("length");
    let dataX = Number(e.target.closest(".cell").dataset.x);
    let dataY = Number(e.target.closest(".cell").dataset.y);

    for (let i = 0; i < length; i++) {
      let x = mode == "hori" ? dataX + i : dataX;
      let y = mode == "hori" ? dataY : dataY + i;
      if (
        x <= 9 &&
        y <= 9 &&
        document.querySelector(`[data-x="${x}"][data-y="${y}"]`)
      ) {
        document
          .querySelector(`[data-x="${x}"][data-y="${y}"]`)
          .classList.add("drag");
      }
    }
  });

  container.addEventListener("dragend", () => {
    let test = document.querySelectorAll(".drag");
    test.forEach((t) => {
      t.classList.remove("drag");
    });
  });

  const startBtn = document.createElement("button")

  startBtn.textContent = "Start Game"

  startBtn.addEventListener("click", () => {
    if (Object.keys(player.ships).length != 0) return
    gameControllerAI.intializeGame()
  })

  shipContainer.appendChild(startBtn)

  let counterAlpha = 65;

  board.forEach((ele, eleIndex) => {
    const divAlpha = document.createElement("div");
    const divNumb = document.createElement("div");

    divAlpha.textContent = String.fromCharCode(counterAlpha);
    divAlpha.classList = "alpha";
    counterAlpha++;

    divNumb.textContent = board.indexOf(ele) + 1;
    divNumb.classList = "numb";
    container.appendChild(divAlpha);

    ele.forEach((cell, cellIndex) => {
      const div = document.createElement("div");
      div.classList = "cell";
      if (cell.hit && cell.ship) {
        div.textContent = "X";
        if (cell.ship.isSunk()) div.textContent = "sunk";
      } else if (cell.hit && !cell.ship) {
        div.textContent = "O";
      } else if (!cell.hit && cell.ship) {
        div.textContent = cell.ship.name;
      } else {
        div.textContent = "-";
        div.dataset.x = eleIndex;
        div.dataset.y = cellIndex;
      }
      container.appendChild(div);
    });
    container.appendChild(divNumb);
  });
};

export default renderSetUp;
