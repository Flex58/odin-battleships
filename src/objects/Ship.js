class Ship {
    constructor(length) {
        this.length = length
        this.hits = 0
        this.sunk = false
    }
    hit() {
        this.hits++
        return(this.hits)
    }

    isSunk() {
        if(this.hits >= this.length) this.sunk = true
        else this.sunk = false
        return this.sunk
    }
}

export default Ship