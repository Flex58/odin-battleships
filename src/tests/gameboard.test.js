import Gameboard from "../objects/Gameboard";
import Ship from "../objects/Ship";

const board = new Gameboard()

test("Gameboard intialized", () => {
    expect(board.board[0]).toHaveLength(10)
})

test("Place Ships on Board", () => {
    expect(board.place(new Ship(2), 7, 6)).toBe(board.board[7][7])
})

test("Place Ships on Board Horizontal", () => {
    expect(board.place(new Ship(2), 5, 6, "hori")).toBe(board.board[6][6])
})

test("Place Ships on another Ship", () => {
    expect(() => board.place(new Ship(2), 5, 6, "hori")).toThrow("Ship already placed")
})

test("Place Ship out of Bounds", () => {
    expect(() => board.place(new Ship(2), 5, 10)).toThrow("Out of Area")
})

test("Place Ship out of Bounds Horizontal", () => {
    expect(() => board.place(new Ship(2), 10, 6, "hori")).toThrow("Out of Area")
})

test("Recieve Attack hit", () => {
    expect(board.recieveAttack(5, 6)).toBe(board.board[6][6].hits)
})

test("Recieve Attack miss", () => {
    expect(board.recieveAttack(3, 2)).toBe(board.missedShots.length)
})

test("Recieve Attack miss", () => {
    expect(board.recieveAttack(3, 2)).toBe(board.missedShots.length)
})