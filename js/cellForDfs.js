function Cell(i, j){
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.visited = false;
  this.again = false;

  this.head = function(){
    var x = this.i * setWidth;
    var y = this.j * setWidth;
    noStroke();
    fill(0, 255, 255);
    rect(x, y, setWidth, setWidth);
  }

  this.show = function(){
    var x = this.i * setWidth;
    var y = this.j * setWidth;
    stroke(255);
    if(this.walls[0]){
      line(x, y, x, y+setWidth);
    }
    if(this.walls[1]){
      line(x, y+setWidth, x+setWidth, y+setWidth);
    }
    if(this.walls[2]){
      line(x+setWidth, y+setWidth, x+setWidth, y);
    }
    if(this.walls[3]){
      line(x+setWidth, y, x, y);
    }
    if(this.visited){
      noStroke();
      fill(204, 102, 0);
      rect(x, y, setWidth, setWidth);
    }
    if(this.again){
      fill(40, 40, 150);
      rect(x, y, setWidth, setWidth);
    }
  }

  this.checkNeibs = function(){
    var neibs = [];

    var top = mainGrid[index(i - 1, j)];
    var right = mainGrid[index(i, j + 1)];
    var bottom = mainGrid[index(i + 1, j)];
    var left = mainGrid[index(i, j - 1)];

    if(top && !top.visited){
      neibs.push(top);
    }
    if(right && !right.visited){
      neibs.push(right);
    }
    if(bottom && !bottom.visited){
      neibs.push(bottom);
    }
    if(left && !left.visited){
      neibs.push(left);
    }
    if(neibs.length > 0){
      return neibs[floor(random(0, neibs.length))];
    }else{
      return undefined;
    }

  }
}
