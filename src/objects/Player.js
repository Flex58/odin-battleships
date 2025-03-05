import Gameboard from "./Gameboard";
import Ship from "./Ship";

class Player {
  constructor(name = "player") {
    this.gameboard = new Gameboard();
    this.name = name;
    this.ships = {
      carrier: new Ship(5, "car"),
      battleship: new Ship(4, "bat"),
      destroyer: new Ship(3, "des"),
      submarine: new Ship(3, "sub"),
      patrolboat: new Ship(2, "pat"),
    };
  }

  resetBoard() {
    this.ships = {
        carrier: new Ship(5, "car"),
        battleship: new Ship(4, "bat"),
        destroyer: new Ship(3, "des"),
        submarine: new Ship(3, "sub"),
        patrolboat: new Ship(2, "pat"),
      };
    return (this.gameboard = new Gameboard());
  }
}

export default Player;
