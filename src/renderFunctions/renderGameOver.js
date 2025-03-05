import gameControllerAI from "../gameController"
import clearDisplay from "./clearDisplay"
import renderSetUp from "./renderSetUp"

const renderGameOver = (player) => {
    const modal = document.querySelector("#modal")
    modal.style.display = "flex"

    const btn = document.querySelector("#restart")

    const text = document.querySelector("#modal-text")

    text.textContent = `${player} won!`

    btn.addEventListener("click", () => {
        modal.style.display = "none"
        clearDisplay("#content")
        gameControllerAI.getActivePlayer().resetBoard()
        renderSetUp(gameControllerAI.getActivePlayer())
    })
}

export default renderGameOver