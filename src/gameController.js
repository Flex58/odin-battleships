import Player from "./objects/Player";
import Ship from "./objects/Ship";

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

  return {
    getActivePlayer,
    switchActivePlayer,
  };
};

export default gameController;
