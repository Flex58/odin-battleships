class Gameboard {
  constructor() {
    this.board = new Array(10);
    for (let i = 0; i < this.board.length; i++) {
      this.board[i] = new Array(10);
    }
  }

  place(ship, coordW, coordH, mode = "vert"){
    if (mode == "vert") {
        //we check with -1 for out of area because we count inclusive (5+6 = 5,6,7,8,9,10)
        if (ship.length + coordH - 1 > 10) {
            throw new Error("Out of Area")
        }
        for (let i = 0; i < ship.length; i++){
            this.board[coordW][coordH + i] = ship
        }
        return this.board[coordW][coordH]
    }
    else if(mode == "hori") {
        if (ship.length + coordW - 1> 10) {
            throw new Error("Out of Area")
        }
        for (let i = 0; i < ship.length; i++){
            this.board[coordW + i][coordH] = ship
        }
        return this.board[coordW][coordH]
    }
  }
}

export default Gameboard;
