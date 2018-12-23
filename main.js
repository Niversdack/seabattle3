var rows = 10;
var cols = 10;
var squareSize = 25;

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

var yourBoardContainer = document.getElementById("board2");

// make the grid columns and rows
for (i = 0; i < cols; i++) {
  for (j = 0; j < rows; j++) {
    // create a new div HTML element for each grid square and make it the right size
    var square = document.createElement("div");
    yourBoardContainer.appendChild(square);

    // give each div element a unique id based on its row and column, like "s00"
    square.id = "p" + j + i;

    // set each grid square's coordinates: multiples of the current row or column number
    var topPosition = j * squareSize;
    var leftPosition = i * squareSize;

    // use CSS absolute positioning to place each grid square on the page
    square.style.top = topPosition + "px";
    square.style.left = leftPosition + "px";
  }
}
var hitCount = 0;
var yourBoard = [
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
function CheckShip(x, y, size, hor, board) {
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
      if (board[x][z] == 0 && board[x][z] != 5) {
        anyBoxesChecked.push(true);
      } else {
        anyBoxesChecked.push(false);
      }
    }

    if (anyBoxesChecked.every(elem => elem == true)) {
      //Разменщение кораблика
      for (let i = 0; i < size; i++) {
        var z = y + i;
        board[x][z] = 1;
        CreateBorder(x, z, board);
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
      if (board[z][y] == 0 && board[z][y] != 5) {
        anyBoxesChecked.push(true);
      } else {
        anyBoxesChecked.push(false);
      }
    }

    if (anyBoxesChecked.every(elem => elem == true)) {
      for (let i = 0; i < size; i++) {
        var z = x + i;
        board[z][y] = 1;
        CreateBorder(z, y, board);
      }
      result = true;
    }
  }
  return result;
}

function CreateBorder(x, y, board) {
  if (x + 1 <= 9) {
    let xx = x + 1;
    if (board[xx][y] == 0 || board[xx][y] == 5) {
      board[xx][y] = 5;
    }
  }
  if (0 <= x - 1) {
    let xx = x - 1;
    if (board[xx][y] == 0 || board[xx][y] == 5) {
      board[xx][y] = 5;
    }
  }
  if (y + 1 <= 9) {
    let yy = y + 1;
    if (board[x][yy] == 0 || board[x][yy] == 5) {
      board[x][yy] = 5;
    }
  }
  if (0 <= y - 1) {
    let yy = y - 1;
    if (board[x][yy] == 0 || board[x][yy] == 5) {
      board[x][yy] = 5;
    }
  }
}

function Lincorn(range, board) {
  x = getRandomInt(0, rows - 1);
  y = getRandomInt(0, rows - 1);
  var horizontal = Math.random() >= 0.5;
  if (CheckShip(x, y, range, horizontal, board)) {
    //console.log(x + "," + y + "," + range + "," + horizontal,board);
    return true;
  } else return false;
}

function GenerateShips(board) {
  //Ставим линкорн
  PasteShip(1, 4, board);
  //крейсеры
  PasteShip(2, 3, board);
  //эсминцы
  PasteShip(3, 2, board);
  //Лодочки
  PasteShip(4, 1, board);
  return board;
}
GenerateShips(gameBoard);
GenerateShips(yourBoard);
gameBoardContainer.addEventListener("click", fireTorpedo, false);
//yourBoardContainer.addEventListener("click",PcFire,false);
function PasteShip(amout, size, board) {
  let check = [];
  for (let i = 0; i < amout; i++) {
    do {
      check.push(Lincorn(size, board));
    } while (check.every(e => e == false));
    check = [];
  }
}

function fireTorpedo(e) {
  var miss = parseInt(document.getElementById("miss").innerHTML,10);
  var hits = parseInt(document.getElementById("hit").innerHTML,10);  

  if (e.target !== e.currentTarget) {
    // extract row and column # from the HTML element's id
    var row = e.target.id.substring(1, 2);
    var col = e.target.id.substring(2, 3);
    //alert("Clicked on row " + row + ", col " + col);

    // if player clicks a square with no ship, change the color and change square's value
    if (gameBoard[row][col] == 0 || gameBoard[row][col] == 5) {
      e.target.style.background = "#bbb";
      gameBoard[row][col] = 3;
      miss = parseInt(miss, 10) + 1;
      document.getElementById("miss").innerHTML = miss;
      botclick();

    } else if (gameBoard[row][col] == 1) {
      e.target.style.background = "red";
      // set this square's value to 2 to indicate the ship has been hit
      gameBoard[row][col] = 2;
      hits = parseInt(hits, 10) + 1;
      document.getElementById("hit").innerHTML = hits;
      // increment hitCount each time a ship is hit
      hitCount++;
      // this definitely shouldn't be hard-coded, but here it is anyway. lazy, simple solution:
      if (hitCount == 17) {

      }

      // if player clicks a square that's been previously hit, let them know
    }
  }
  e.stopPropagation();
}

function botclick() {

  do {

    var miss1 = parseInt(document.getElementById("miss2").innerHTML,10);
    var hits1 = parseInt(document.getElementById("hit2").innerHTML,10);
    do{
      x = getRandomInt(0, 9);
      y = getRandomInt(0, 9);
    }while(yourBoard[x][y] == 3)
   
    
    var hit;
    if (yourBoard[x][y] == 1) {
      yourBoard[x][y] = 3;
      document.getElementById("p" + x + y).style.background = "red";
      hit = true;

      hits1 = parseInt(hits1, 10) + 1;
      document.getElementById("hit2").innerHTML = hits1;
    } else {
      yourBoard[x][y] = 3;
      document.getElementById("p" + x + y).style.background = "blue";
      hit = false;

      miss1 = parseInt(miss1, 10) + 1;
      document.getElementById("miss2").innerHTML = miss1;


    }

  } while (hit == true);

}

function Search() {
  //let sum=0;
  for (let x = 0; x < yourBoard.length; x++) {
    for (let y = 0; y < yourBoard[x].length; y++) {
      const elem = yourBoard[x][y];

      if (elem == 1) {
        document.getElementById("p" + x + y).style.background = "black";
        //sum++;
        //console.log(sum);
      }
    }
  }

}