import Gameboard from "../objects/Gameboard";
import Ship from "../objects/Ship";

const board = new Gameboard()

test("Gameboard intialized", () => {
    expect(board.board[0]).toHaveLength(10)
})

test("Place Ships on Board", () => {
    expect(board.place(new Ship(2), 5, 6)).toBe(board.board[5][6])
})

test("Place Ships on Board Horizontal", () => {
    expect(board.place(new Ship(2), 5, 6, "hori")).toBe(board.board[6][6])
})

test("Place Ship out of Bounds", () => {
    expect(() => board.place(new Ship(2), 5, 10)).toThrow("Out of Area")
})

test("Place Ship out of Bounds Horizontal", () => {
    expect(() => board.place(new Ship(2), 10, 6, "hori")).toThrow("Out of Area")
})