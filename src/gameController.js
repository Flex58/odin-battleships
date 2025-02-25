import Player from "./objects/Player";
import clearDisplay from "./renderFunctions/clearDisplay";
import renderDisplay from "./renderFunctions/renderDisplay";

const gameControllerObj = (mode = "PVP") => {
  const Player1 = new Player();
  const Player2 = new Player();

  let activePlayer = Player1;

  const switchActivePlayer = () => {
    return (activePlayer = activePlayer == Player1 ? Player2 : Player1);
  };

  const getActivePlayer = () => {
    return activePlayer;
  };

  const getInactivePlayer = () => {
    return activePlayer == Player1 ? Player2 : Player1;
  };

  const intializeGame = () => {
    getActivePlayer().gameboard.placeShipsRandom();
    getInactivePlayer().gameboard.placeShipsRandom();
    renderDisplay(getInactivePlayer().gameboard.board);
    renderDisplay(getActivePlayer().gameboard.board, "own");
  };

  const updateScreen = () => {
    clearDisplay("#content");
    renderDisplay(getInactivePlayer().gameboard.board);
    renderDisplay(getActivePlayer().gameboard.board, "own");
  };

  const playTurn = (coordW, coordH) => {
    try {
      const hit = getInactivePlayer().gameboard.recieveAttack(coordW, coordH);
      updateScreen();
      if (getInactivePlayer().gameboard.allSunk()) {
        //do something
      }
      if (hit) return;
      switchActivePlayer();
      if (getActivePlayer() == Player2 && mode == "AI") {
        playAI();
      }
    } catch {}
  };

  const playAI = () => {
    let success = false;
    while (!success) {
      try {
        const hit = getInactivePlayer().gameboard.recieveAttack(
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
        );
        success = true;
        if (hit) playAI();
        else {
          switchActivePlayer();
          updateScreen();
        }
      } catch {}
    }
  };

  return {
    getActivePlayer,
    switchActivePlayer,
    getInactivePlayer,
    intializeGame,
    playTurn,
  };
};

const gameControllerAI = gameControllerObj("AI");
const gameControllerPVP = gameControllerObj("PVP");

export default gameControllerAI;
