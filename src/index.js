import renderDisplay from "./renderFunctions/renderDisplay";
import clearDisplay from "./renderFunctions/clearDisplay";
import gameController from "./gameController";
import renderSetUp from "./renderFunctions/renderSetUp";
import "./styles.css";


const game = gameController;
renderSetUp(game.getActivePlayer())
//game.intializeGame();
