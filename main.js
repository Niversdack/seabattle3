var rows = 10;
var cols = 10;
var squareSize = 50;

// get the container element
var gameBoardContainer = document.getElementById("board1");

// make the grid columns and rows
for (i = 0; i < cols; i++) {
  for (j = 0; j < rows; j++) {
    // create a new div HTML element for each grid square and make it the right size
    var square = document.createElement("div");
    gameBoardContainer.appendChild(square);

    // give each div element a unique id based on its row and column, like "s00"
    square.id = "s" + j + i;

    // set each grid square's coordinates: multiples of the current row or column number
    var topPosition = j * squareSize;
    var leftPosition = i * squareSize;

    // use CSS absolute positioning to place each grid square on the page
    square.style.top = topPosition + "px";
    square.style.left = leftPosition + "px";
  }
}
var hitCount = 0;

/* create the 2d array that will contain the status of each square on the board
   and place ships on the board (later, create function for random placement!)

   0 = empty, 1 = part of a ship, 2 = a sunken part of a ship, 3 = a missed shot
*/
var gameBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

//Генерация целого числа в определенном диапазоне
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//проверка пустоты - занятость ячейки
function ChechShip(x, y, size, hor) {
  let result = false;
  maxrows = rows - 1;
  var anyBoxesChecked = [];
  if (hor) {
    //проверка на вместимость по координатам
    if (y + size > maxrows) {
      yy = y + size; //
      y = y - (yy - maxrows);
    }
    for (let i = 0; i < size; i++) {
      var z = y + i;
      if (gameBoard[x][z] == 0 && gameBoard[x][z]!=2) {
        anyBoxesChecked.push(true);
      } else {
        anyBoxesChecked.push(false);
      }
    }

    if (anyBoxesChecked.every(elem => elem == true)) {
      //Разменщение кораблика
      for (let i = 0; i < size; i++) {
        var z = y + i;
        gameBoard[x][z] = 1;
        CreateBorder(x,z);
      }
      
      result = true;
    }
  } else {
    if (x + size > maxrows) {
      xx = x + size;
      x = x - (xx - maxrows);
    }
    for (let i = 0; i < size; i++) {
      var z = x + i;
      if (gameBoard[z][y] == 0 && gameBoard[z][y]!=2) {
        anyBoxesChecked.push(true);
      } else {
        anyBoxesChecked.push(false);
      }
    }

    if (anyBoxesChecked.every(elem => elem == true)) {
      for (let i = 0; i < size; i++) {
        var z = x + i;
        gameBoard[z][y] = 1;
        CreateBorder(z,y);
      }
      result = true;
    }
  }
  return result;
}
function CreateBorder(x,y) {
    if (0<=x+1<=9 && 0<=y<=9){
        let xx =x+1;
        if(gameBoard[xx][y]==0 || gameBoard[xx][y]==2 ){
            gameBoard[xx][y]=2;
        }
    }
    if(0<=x-1<=9 && 0<=y<=9){
        let xx= x-1;
        if(gameBoard[xx][y]==0 || gameBoard[xx][y]==2 ){
            gameBoard[xx][y]=2;
        }
    }
    if(0<=x<=9 && 0<=y+1<=9){
        let yy=y+1;
        if(gameBoard[x][yy]==0 || gameBoard[x][yy]==2){
            gameBoard[x][yy]=2;
        }
    }
    if(0<=x<=9 && 0<=y-1<=9){
        let yy=y-1;
        if(gameBoard[x][yy]==0 || gameBoard[x][yy]==2){
            gameBoard[x][yy]=2;
        }
    }
}
function Lincorn(range) {
  x = getRandomInt(0, rows - 1);
  y = getRandomInt(0, rows - 1);
  var horizontal = Math.random() >= 0.5;
  if (ChechShip(x, y, range, horizontal)) {
    console.log(x + "," + y + "," + range + "," + horizontal);
    return true;
  } else return false;
}
function GenerateShips(e) {
  //Ставим линкорн
  PasteShip(1, 4);
  //крейсеры
  PasteShip(2, 3);
  //эсминцы
  PasteShip(3, 4);
  //Лодочки
  PasteShip(4, 1);
  return gameBoard;
}
gameBoardContainer.addEventListener("click", fireTorpedo, false);
function PasteShip(amout, size) {
  let check = [];
  for (let i = 0; i < amout; i++) {
    do {
      check.push(Lincorn(size));
    } while (check.every(e => e == false));
    check = [];
  }
}
function fireTorpedo(e) {
  // if item clicked (e.target) is not the parent element on which the event listener was set (e.currentTarget)
  if (e.target !== e.currentTarget) {
    // extract row and column # from the HTML element's id
    var row = e.target.id.substring(1, 2);
    var col = e.target.id.substring(2, 3);
    //alert("Clicked on row " + row + ", col " + col);

    // if player clicks a square with no ship, change the color and change square's value
    if (gameBoard[row][col] == 0) {
      e.target.style.background = "#bbb";
      // set this square's value to 3 to indicate that they fired and missed
      gameBoard[row][col] = 3;

      // if player clicks a square with a ship, change the color and change square's value
    } else if (gameBoard[row][col] == 1) {
      e.target.style.background = "red";
      // set this square's value to 2 to indicate the ship has been hit
      gameBoard[row][col] = 2;

      // increment hitCount each time a ship is hit
      hitCount++;
      // this definitely shouldn't be hard-coded, but here it is anyway. lazy, simple solution:
      if (hitCount == 17) {
        alert("All enemy battleships have been defeated! You win!");
      }

      // if player clicks a square that's been previously hit, let them know
    } else if (gameBoard[row][col] > 1) {
      alert("Stop wasting your torpedos! You already fired at this location.");
    }
  }
  e.stopPropagation();
}
