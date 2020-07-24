
function Cell(start, end){
  this.start = start;
  this.end = end;
  this.walls = [true, true];

  this.visited = false;
  this.neib = false;

  this.equals = function(cell){
    return this.start == cell.start && this.end == cell.end;
  }

  this.show = function(){
    var i = floor(this.start / cols);
    var j = floor(this.start % cols);
    var x = i * w;
    var y = j * w;
    if(this.visited){
      fill(255, 0, 0);
    }else if(this.neib){
      fill(255, 50, 100);
    }
    noStroke();
    rect(x, y, w, w);
    strokeWeight(2);
    stroke(51);
    if(this.walls[0]){
      line(x, y + w, x + w, y + w);
    }
    if(this.walls[1]){
      line(x + w, y, x+w, y+w);
    }
  }
}
