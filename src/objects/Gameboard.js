import Cell from "./Cell";

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
    if (mode == "vert") {
      //we check with -1 for out of area because we count inclusive (5+6 = 5,6,7,8,9,10)
      if (ship.length + coordH - 1 > 10) {
        throw new Error("Out of Area");
      }

      for (let i = 0; i < ship.length; i++) {
        if (this.board[coordW][coordH + i].ship) {
          throw new Error("Ship already placed");
        }
      }

      for (let i = 0; i < ship.length; i++) {
        this.board[coordW][coordH + i].ship = ship;
      }
      return this.board[coordW][coordH];
    } else if (mode == "hori") {
      if (ship.length + coordW - 1 > 10) {
        throw new Error("Out of Area");
      }

      for (let i = 0; i < ship.length; i++) {
        if (this.board[coordW][coordH + i].ship) {
          throw new Error("Ship already placed");
        }
      }

      for (let i = 0; i < ship.length; i++) {
        this.board[coordW + i][coordH].ship = ship;
      }
      return this.board[coordW][coordH];
    }
  }

  recieveAttack(coordW, coordH) {
    if (this.board[coordW][coordH].ship && !this.board[coordW][coordH].hit) {
      this.board[coordW][coordH].ship.hit();
      this.board[coordH][coordH].hit = true;
      if (this.board[coordW][coordH].ship.isSunk()) this.sunkCount++;
      return this.board[coordW][coordH].ship.hits;
    } else if (!this.board[coordW][coordH].hit) {
      return (this.board[coordW][coordH].hit = true);
    } else {
      throw new Error("Cell already hit");
    }
  }

  allSunk() {
    if (this.sunkCount == 5) return true;
    return false;
  }
}

export default Gameboard;
