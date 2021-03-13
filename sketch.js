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
  this.scale = 0;
}

Tile.prototype.draw = function() {
  if (this.hover === true) {
    fill(122, 244, 22);
  } else {
    fill(244);
  }

  translate(this.scale, this.scale);
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

  //Winner
  
  //Top
  if (tiles[0].status === "X" && tiles[3].status === "X" && tiles[6].status === "X") {
    piece = 9;
  }
  //Left
  else if (tiles[0].status === "X" && tiles[1].status === "X" && tiles[2].status === "X") {
    piece = 9;
  }
  //Right
  else if (tiles[6].status === "X" && tiles[7].status === "X" && tiles[8].status === "X") {
    piece = 9;
  }
  //Bottom
  else if (tiles[2].status === "X" && tiles[5].status === "X" && tiles[8].status === "X") {
    piece = 9;
  }
  //Middle side
  else if (tiles[1].status === "X" && tiles[4].status === "X" && tiles[6].status === "X") {
    piece = 9;
  }
  //Middle top
  else if (tiles[3].status === "X" && tiles[4].status === "X" && tiles[5].status === "X") {
    piece = 9;
  }

  //Diagonal Left
  else if (tiles[0].status === "X" && tiles[4].status === "X" && tiles[8].status === "X") {
    piece = 9;
  }
  
   //Diagonal Right
   else if (tiles[6].status === "X" && tiles[4].status === "X" && tiles[2].status === "X") {
    piece = 9;
  }

  //Drop
  tiles.forEach(element => {
    if (piece >= 9) {
      for (let index = 0; index < tiles.length; index++) {
        tiles[index].y+=0.5;
        tiles[index].scale-=0.05;
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