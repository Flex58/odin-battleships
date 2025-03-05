import gameControllerAI from "../gameController";

const renderDisplay = (board, mode = "opponent") => {
  const OWN_MODE = "own";
  const OPP_MODE = "opponent";

  const content = document.querySelector("#content");
  const container = document.createElement("div");
  container.id = mode;
  content.appendChild(container);

  const emptyDiv = document.createElement("div");
  emptyDiv.id = "empty";
  container.appendChild(emptyDiv);

  let counterAlpha = 65;

  if (mode != OWN_MODE) {
    container.addEventListener("click", (e) => {
      const target = e.target.closest(".cell");
      if (!target) return;

      gameControllerAI.playTurn(
        Number(target.dataset.x),
        Number(target.dataset.y),
      );
    });
  }
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
      } else if (!cell.hit && cell.ship && mode == "own") {
        div.textContent = cell.ship.name;
      } else {
        div.textContent = "-";
        if (mode != OWN_MODE) {
          div.dataset.x = eleIndex;
          div.dataset.y = cellIndex;
        }
      }
      container.appendChild(div);
    });
    container.appendChild(divNumb);
  });
};

export default renderDisplay;
