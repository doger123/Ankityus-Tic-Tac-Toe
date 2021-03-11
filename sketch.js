function setup() {
  createCanvas(300, 300);
}

let tiles = []
let playerturn = 1;
let aistatus = false;
let piece = 0;

let Tile = function(x, y) {
  this.x = x;
  this.y = y;
  this.size = 100;
  this.status = "";
  this.hover = false;
}

Tile.prototype.draw = function() {
  if (this.hover === true) {
    fill(122, 244, 22);
  } else {
    fill(244);
  }
  rect(this.x, this.y, this.size, this.size);
  textSize(99);
  fill(0, 0, 0);
  text(this.status, this.x + 15, this.y, this.size, this.size);
}

Tile.prototype.checkinside = function(x, y) {
  if (x > this.x && x < this.x + this.size && y > this.y && y < this.y + this.size && playerturn === 1 && this.status === "") {
    playerturn = 2;
    this.status = "X";
    piece+=1;
  }
}

Tile.prototype.hovermethod = function(x, y) {
  if (x > this.x && x < this.x + this.size && y > this.y && y < this.y + this.size) {
    this.hover = true;
  } else {
    this.hover = false;
  }
}

//Create Tiles
for (let dx = 0; dx < 3; dx++) {
  for (let dy = 0; dy < 3; dy++) {
    tiles.push(new Tile(dx * 100, dy * 100));
  }
}

function draw() {
  background(220);
  //Draw Tiles
  tiles.forEach(element => {
    element.draw();
  });

  //Drop
  tiles.forEach(element => {
    if (piece >= 9) {
      for (let index = 0; index < tiles.length; index++) {
        tiles[index].y+=0.5;
        textSize(24);
      }
    }
  });

  //AI
  if (playerturn === 2) {
    var ai = tiles[Math.floor(Math.random() * tiles.length)];
    aistatus = true;
    if (ai.status === "" && aistatus == true) {
        playerturn = 1;
        ai.status = "O";
        aistatus = false;
        piece+=1;
    }
  }
}

function mousePressed() {
   tiles.forEach(element => {
     element.checkinside(mouseX, mouseY);
   });
}

function mouseMoved() {
     tiles.forEach(element => {
     element.hovermethod(mouseX, mouseY);
   });
}