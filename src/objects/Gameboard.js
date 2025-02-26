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
    const oldBoard = [].concat(this.board)
    if (mode == "vert") {
      //we check with -1 for out of area because we count inclusive (5+6 = 5,6,7,8,9,10)
      if (ship.length + coordH - 1 > 10) {
        throw new Error("Out of Area");
      }

      for (let i = 0; i < ship.length; i++) {
        if (this.board[coordW][coordH + i].ship) {
          this.board = oldBoard
          throw new Error("Ship already placed");
        }
        this.board[coordW][coordH + i].ship = ship;
      }
      return this.board[coordW][coordH];
    } else if (mode == "hori") {
      if (ship.length + coordW - 1 > 10) {
        throw new Error("Out of Area");
      }

      for (let i = 0; i < ship.length; i++) {
        if (this.board[coordW][coordH + i].ship) {
          this.board = oldBoard
          throw new Error("Ship already placed");
        }
        this.board[coordW + i][coordH].ship = ship;
      }
      return this.board[coordW][coordH];
    }
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
        } catch {}
      }
    }
  }
}

export default Gameboard;
