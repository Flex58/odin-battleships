import Player from "./objects/Player";
import Ship from "./objects/Ship";
import renderDisplay from "./renderFunctions/renderDisplay";

const gameController = () => {
  const Player1 = new Player();
  const AI = new Player();

  let activePlayer = Player1;

  const switchActivePlayer = () => {
    return (activePlayer = activePlayer == Player1 ? AI : Player1);
  };

  const getActivePlayer = () => {
    return activePlayer;
  };


  Player1.gameboard.placeShipsRandom()

  AI.gameboard.placeShipsRandom()
  AI.gameboard.recieveAttack(1,1)
  AI.gameboard.recieveAttack(5,5)
  AI.gameboard.recieveAttack(3,6)
  renderDisplay(AI.gameboard.board);
  renderDisplay(Player1.gameboard.board, "own")

  return {
    getActivePlayer,
    switchActivePlayer,
  };
};

export default gameController;
