import gameControllerAI from "../gameController"

const renderGameOver = (player) => {
    const modal = document.querySelector("#modal")
    modal.style.display = "block"

    const btn = document.querySelector("#restart")

    const text = document.querySelector("#modal-text")

    text.textContent = `${player} won!`

    btn.addEventListener("click", () => {
        modal.style.display = "none"
        gameControllerAI.intializeGame()
        gameControllerAI.updateScreen()
    })
}

export default renderGameOver