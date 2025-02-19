const renderDisplay = (board, mode = "opponent") => {
  const content = document.querySelector("#content");
  const container = document.createElement("div");
  container.id = mode;
  content.appendChild(container);

  const emptyDiv = document.createElement("div")
  emptyDiv.id = "empty"
  container.appendChild(emptyDiv)

  let counterAlpha = 65;
  board.forEach((ele) => {
    const divAlpha = document.createElement("div");
    const divNumb = document.createElement("div");

    divAlpha.textContent = String.fromCharCode(counterAlpha);
    divAlpha.classList = "alpha";
    counterAlpha++;

    divNumb.textContent = board.indexOf(ele) + 1;
    divNumb.classList = "numb";
    container.appendChild(divAlpha);

    ele.forEach((cell) => {
      const div = document.createElement("div");
      div.classList = "cell";
      div.id = board.indexOf(ele) + " " + ele.indexOf(cell);
      if (cell.hit && cell.ship) {
        div.textContent = "X";
      } else if (cell.hit && !cell.ship) {
        div.textContent = "O";
      } else if (!cell.hit && cell.ship && mode == "own") {
        div.textContent = "ship";
      } else {
        div.textContent = "-";
      }
      container.appendChild(div);
    });
    container.appendChild(divNumb);
  });
};

export default renderDisplay;
