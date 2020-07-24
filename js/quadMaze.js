

//inputs: width of the rectangles; frameRate

var rows, cols;
var setWidth = 20;
var mainGrid = [];
var curr;

var backtrack = [];


function setup() {
  createCanvas(400, 400);
  // setWidth = document.getElementById('size').value;
  cols = floor(width/setWidth);
  rows = floor(height/setWidth);
  
  for(var i = 0; i < rows; i++){
    for(var j = 0; j < cols; j++){
      var newCell = new Cell(i, j);
      mainGrid.push(newCell);
    }
  }
  curr = mainGrid[0];
}

  function draw() {
    background(1);

    for(var i = 0; i < mainGrid.length; i++){
      mainGrid[i].show();
    }
    curr.visited = true;
    curr.head();
    var next = curr.checkNeibs();

    if(next){
      next.visited = true;
      backtrack.push(curr);
      removeWalls(curr, next);
      curr = next;
    }else if(backtrack.length > 0){
      curr.again = true;
      curr = backtrack.pop();
    }else if(curr == mainGrid[0]){
      noLoop();
    }
  }


function index(i, j){
  if(i<0 || j<0 || i>rows-1 || j>cols-1){
    return -1;
  }
  return j + i * cols;
}

function removeWalls(curr, next){
  var x = curr.i - next.i;
  if(x === -1){
    curr.walls[2] = false;
    next.walls[0] = false;
  }else if(x === 1){
    curr.walls[0] = false;
    next.walls[2] = false;
  }

  var y = curr.j - next.j;

  if(y === 1){
    curr.walls[3] = false;
    next.walls[1] = false;
  }else if(y === -1){
    curr.walls[1] = false;
    next.walls[3] = false;
  }
}
