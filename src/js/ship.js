class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk=false
  }
  isSunk() {
    if(this.length === this.hits){
      this.sunk=true;
      return true;
    }
  }

  hit() {
    ++this.hits;
  }
}

export { Ship };
