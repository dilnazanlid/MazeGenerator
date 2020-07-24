
var rows, cols;
var w = 20;
var toVisit = [];

var maze = [];
var visited = [];

function setup() {
  createCanvas(600, 600);
  cols = floor(width/w);
  rows = floor(height/w);
  for(var i = 0; i < rows*cols; i++){
      maze.push(new Cell(i));
      toVisit.push(new Cell(i));
  }

}

function draw() {
  background(255);

  line(0, 0, width, 0);
  line(width, 0, width, height);
  line(width, height, 0, height);
  line(0, 0, 0, height);
  var end = true;
  var parent = maze[0].parent;
  for(var i = 1; i < maze.length; i++){
    if(end && parent != maze[i].parent){
      end = false;
    }
    maze[i].show();
  }
  if(end){
    noLoop();
    console.log("end");
  }

  if(toVisit.length>0){
    var rand = floor(random(0, toVisit.length));
    var start = toVisit[rand].start;
      var side = floor(random(0, 2));
        if(side == 0){
          if(start % cols == cols - 1 || maze[start].parent == maze[start+1].parent){

          }else if(maze[start].parent > maze[start+1].parent){
            maze[start+1].changeParent(maze[start]);
            maze[start].walls[0] = false;
          }else{
            maze[start].changeParent(maze[rand+1]);
            maze[start].walls[0] = false;
          }
        }else{
          if(start + cols >= rows*cols || maze[start].parent == maze[start+cols].parent){

          }else if(maze[start].parent > maze[start+cols].parent){
            maze[start+cols].changeParent(maze[start]);
            maze[start].walls[1] = false;
          }else{
            maze[start].changeParent(maze[start+cols]);
            maze[start].walls[1] = false;
          }
        }


  }
}

// function newNode(next){
//   if(next.start > next.end){
//     mainGrid.push(new Cell(next.end, next.start));
//   }else{
//     mainGrid.push(next);
//   }
//   visited.push(next.end);
//
//   var top = next.end - cols;
//   if(top > 0 && !visited.includes(top)){
//     toVisit.push(new Cell(next.end, top));
//   }
//   var right = next.end + 1;
//   if(right % cols != 0 && !visited.includes(right)){
//     toVisit.push(new Cell(next.end, right));
//   }
//   var bottom = next.end + cols;
//   if(bottom < rows * cols && !visited.includes(bottom)){
//     toVisit.push(new Cell(next.end, bottom));
//   }
//   var left = next.end - 1;
//   if(left % cols != cols-1 && !visited.includes(left)){
//     toVisit.push(new Cell(next.end, left));
//   }
//   if(mainGrid[0].start != undefined){
//     if(mainGrid[0].start + 1 == mainGrid[0].end){
//       maze[mainGrid[0].start].walls[0] = false;
//     }else{
//       maze[mainGrid[0].start].walls[1] = false;
//     }
//   }
// }


function Cell(start){
  this.start = start;
  this.parent = this.start;
  this.visited = false;
  this.changeParent = function(newParent){
    this.parent = newParent.parent;
  }

  this.walls = [true, true];

  this.equals = function(cell){
    return this.start == cell.start;
  }

  this.show = function(){
    var i = floor(this.start / cols);
    var j = floor(this.start % cols);
    var x = i * w;
    var y = j * w;
    strokeWeight(2);
    stroke(51);
    if(this.walls[0]){
      line(x, y + w, x + w, y + w);
    }
    if(this.walls[1]){
      line(x + w, y, x + w, y + w);
    }
  }
}
