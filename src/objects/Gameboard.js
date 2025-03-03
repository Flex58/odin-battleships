import Cell from "./Cell";
import Ship from "./Ship";

class Gameboard {
  constructor() {
    this.board = new Array(10);
    for (let i = 0; i < this.board.length; i++) {
      this.board[i] = new Array(10);
      for (let j = 0; j < this.board.length; j++) {
        this.board[i][j] = new Cell();
      }
    }
    this.sunkCount = 0;
  }

  place(ship, coordW, coordH, mode = "vert") {
    if (
      (mode === "vert" && ship.length + coordH > 10) ||
      (mode === "hori" && ship.length + coordW > 10)
    ) {
      throw new Error("Out of Area");
    }

    for (let i = 0; i < ship.length; i++) {
      let x = mode === "vert" ? coordW : coordW + i;
      let y = mode === "vert" ? coordH + i : coordH;
      if (this.board[x][y].ship) {
        throw new Error("Ship already placed");
      }
    }

    for (let i = 0; i < ship.length; i++) {
      let x = mode === "vert" ? coordW : coordW + i;
      let y = mode === "vert" ? coordH + i : coordH;

      this.board[x][y].ship = ship;
    }

    return this.board[coordW][coordH];
  }

  recieveAttack(coordW, coordH) {
    const cell = this.board[coordW][coordH];
    if (cell.hit) {
      throw new Error("Cell already hit");
    } else if (cell.ship) {
      cell.ship.hit();
      if (cell.ship.isSunk()) this.sunkCount++;
      return (cell.hit = true);
    }
    cell.hit = true;
    return false;
  }

  allSunk() {
    if (this.sunkCount == 5) return true;
    return false;
  }

  placeShipsRandom() {
    let fleet = [
      new Ship(5),
      new Ship(4),
      new Ship(3),
      new Ship(3),
      new Ship(2),
    ];

    for (let ship in fleet) {
      let success = false;
      while (!success) {
        try {
          this.place(
            fleet[ship],
            Math.floor(Math.random() * 10),
            Math.floor(Math.random() * 10),
          );
          success = true;
        } catch (e) {}
      }
    }
  }
}

export default Gameboard;
