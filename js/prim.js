
var rows, cols;
var w = 20;
var mainGrid = [];

var maze = [];
var visited = [];
var toVisit = [];

function setup() {
  createCanvas(600, 600);
  cols = floor(width/w);
  rows = floor(height/w);
  for(var i = 0; i < rows*cols; i++){
      maze.push(new Cell(i, i+1));
  }
  visited.push(0);

  toVisit.push(new Cell(0, 1));
  toVisit.push(new Cell(0, cols));
}

function draw() {
  background(255);

  line(0, 0, width, 0);
  line(width, 0, width, height);
  line(width, height, 0, height);
  line(0, 0, 0, height);
  for(var i = 0; i < maze.length; i++){
      maze[i].show();
  }

  if(toVisit.length > 0){
    var rand = floor(random(0, toVisit.length));

    var next = toVisit[rand];
    toVisit.splice(rand, 1);

    if(!visited.includes(next.end)){
      newNode(next);
      mainGrid.splice(0, 1);
    }
  }
  if(toVisit.length == 0){
    noLoop();
  }
}

function newNode(next){
  if(next.start > next.end){
    mainGrid.push(new Cell(next.end, next.start));
  }else{
    mainGrid.push(next);
  }
  visited.push(next.end);

  var top = next.end - cols;
  if(top > 0 && !visited.includes(top)){
    maze[top].neib = true;
    toVisit.push(new Cell(next.end, top));
  }
  var right = next.end + 1;
  if(right % cols != 0 && !visited.includes(right)){
    maze[right].neib = true;
    toVisit.push(new Cell(next.end, right));
  }
  var bottom = next.end + cols;
  if(bottom < rows * cols && !visited.includes(bottom)){
    maze[bottom].neib = true;
    toVisit.push(new Cell(next.end, bottom));
  }
  var left = next.end - 1;
  if(left % cols != cols-1 && !visited.includes(left)){
    maze[left].neib = true;
    toVisit.push(new Cell(next.end, left));
  }
  if(mainGrid[0].start != undefined){
    if(mainGrid[0].start + 1 == mainGrid[0].end){
      maze[mainGrid[0].start].walls[0] = false;
    }else{
      maze[mainGrid[0].start].walls[1] = false;
    }
    maze[mainGrid[0].start].visited = true;
    maze[mainGrid[0].end].visited = true;
  }
}
