import Gameboard from "../objects/Gameboard";
import Ship from "../objects/Ship";

const board = new Gameboard();

test("Gameboard intialized", () => {
  expect(board.board[0]).toHaveLength(10);
});

test("Place Ships on Board", () => {
  expect(board.place(new Ship(2), 7, 6)).toEqual(board.board[7][7]);
});

test("Place Ships on Board Horizontal", () => {
  expect(board.place(new Ship(2), 5, 6, "hori")).toEqual(board.board[6][6]);
});

test("Place Ships on another Ship", () => {
  expect(() => board.place(new Ship(2), 5, 6, "hori")).toThrow(
    "Ship already placed",
  );
});

test("Place Ship out of Bounds", () => {
  expect(() => board.place(new Ship(2), 5, 10)).toThrow("Out of Area");
});

test("Place Ship out of Bounds Horizontal", () => {
  expect(() => board.place(new Ship(2), 10, 6, "hori")).toThrow("Out of Area");
});

test("Recieve Attack hit", () => {
  //if the ships hit > 0 a attack hit the ship, so recieve attack worked, 
  // can also check if it returns true.
  expect(board.recieveAttack(6, 6)).toBe(board.board[6][6].ship.hits != 0);
});

test("Recieve Attack miss", () => {
  //expect a missed attack to return false, a hit attack to return true
  expect(board.recieveAttack(3, 2)).toBe(false);
});

test("Recieve Attack already hit", () => {
  expect(() => board.recieveAttack(3, 2)).toThrow("Cell already hit");
});

test("Check if sunk and update sunk count", () => {
  board.recieveAttack(5, 6);
  expect(board.sunkCount).toBe(1);
});

test("All Sunk to be true", () => {
  board.sunkCount = 5;
  expect(board.allSunk()).toBe(true);
  board.sunkCount = 1;
});

test("All Sunk to be false", () => {
  expect(board.allSunk()).toBe(false);
});
