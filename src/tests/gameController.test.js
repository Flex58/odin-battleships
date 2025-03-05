import gameController from "../gameController";

const cont = gameController
test("Switch Active Player", () => {
    const old = cont.getActivePlayer()
    expect(cont.switchActivePlayer()).not.toBe(old)
})

test("Place Ships", () => {
    cont.getActivePlayer().gameboard.placeShipsRandom(cont.getActivePlayer().ships)
    expect(cont.getActivePlayer()).not.toEqual(cont.switchActivePlayer())
})