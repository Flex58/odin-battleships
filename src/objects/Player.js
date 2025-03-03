import Gameboard from "./Gameboard";

class Player {
    constructor(name = "player") {
        this.gameboard = new Gameboard()
        this.name = name
    }

    resetBoard() {
        return this.gameboard = new Gameboard()
    }
}

export default Player;