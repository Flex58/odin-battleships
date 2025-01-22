import Ship from "../objects/Ship"

const ship = new Ship(5)
test("Ship Hit", () => {
    
    expect(ship.hit()).toBe(1)
})

test("Ship Sunk", () => {
    ship.hit()
    ship.hit()
    ship.hit()
    ship.hit()
    ship.hit()
    expect(ship.isSunk()).toBe(true)
})