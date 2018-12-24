var rows = 10;
var cols = 10;
var squareSize = 25;
var gameBoardContainer = document.getElementById("board1");
var yourBoardContainer = document.getElementById("board2");
function CreteElmentsInBoard(container) {
  for (i = 0; i < cols; i++) {
    for (j = 0; j < rows; j++) {
      
      var square = document.createElement("div");
      container.appendChild(square);
      if(container==gameBoardContainer){
        square.id = "s" + j + i;
      }else{
        square.id = "p" + j + i;
      }
      var topPosition = j * squareSize;
      var leftPosition = i * squareSize;
      square.style.top = topPosition + "px";
      square.style.left = leftPosition + "px";
    }
  }
}
var hitCount = 0;
var hitCount1 = 0;

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

//проверка пустоты - занятость ячейки. Так же размешение судна
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
      for (let i = 0; i < size; i++) {
        var z = y + i;
        board[x][z] = 1;
        CreateBorder(x, z, board);
      }

      result = true;
    }
  } else {
    //проверка на вместимость по координатам
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
//Создание краев корабля для корректной расстановки кораблей
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
//Координаты и отправка на проверку вместимости корабля
function Lincorn(range, board) {
  x = getRandomInt(0, rows - 1);
  y = getRandomInt(0, rows - 1);
  var horizontal = Math.random() >= 0.5;
  if (CheckShip(x, y, range, horizontal, board)) {
    return true;
  } else return false;
}

function GenerateShips(board) {
  //Ставим линкорн 4 клетки
  PasteShip(1, 4, board);
  //крейсеры 3 клетки
  PasteShip(2, 3, board);
  //эсминцы 2 клетка
  PasteShip(3, 2, board);
  //Лодочки 1 клетка
  PasteShip(4, 1, board);
  return board;
}
GenerateShips(gameBoard);
GenerateShips(yourBoard);
gameBoardContainer.addEventListener("click", fireTorpedo, false);
Search();

//Размещение корабля до 
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

    var row = e.target.id.substring(1, 2);
    var col = e.target.id.substring(2, 3);

    //промахи
    if (gameBoard[row][col] == 0 || gameBoard[row][col] == 5) {
      e.target.style.background = "url(img/dot.svg) no-repeat center";
      e.target.style.backgroundSize = "20px 20px";
      gameBoard[row][col] = 3;
      miss = parseInt(miss, 10) + 1;
      document.getElementById("miss").innerHTML = miss;
      botclick();

      //попадания
    } else if (gameBoard[row][col] == 1) {
      e.target.style.background = "url(img/boom.svg)";
      e.target.style.backgroundSize = "25px 25px";
      
      gameBoard[row][col] = 2;
      hits = parseInt(hits, 10) + 1;
      document.getElementById("hit").innerHTML = hits;
      //Счетчик до окончания игры
      hitCount++;
      if (hitCount == 20) {
        alert(document.getElementsByClassName("text").innerHTML+" победил в этой игре!!!")
      }
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
      document.getElementById("p" + x + y).style.background = "url(img/boom.svg) no-repeat center";
      document.getElementById("p" + x + y).style.backgroundSize = "25px 25px";
      hit = true;
      hits1 = parseInt(hits1, 10) + 1;
      document.getElementById("hit2").innerHTML = hits1;
      hitCount1++;
      if (hitCount1 == 20) {
        alert(document.getElementsByClassName("text1").innerHTML+" победил в этой игре!!!")
      }
    } else {
      yourBoard[x][y] = 3;
      document.getElementById("p" + x + y).style.background = "url(img/dot.svg) no-repeat center";
      document.getElementById("p" + x + y).style.backgroundSize = "20px 20px";
      hit = false;
      miss1 = parseInt(miss1, 10) + 1;
      document.getElementById("miss2").innerHTML = miss1;
    }
  } while (hit == true);
}

function Search() {
  CreteElmentsInBoard(gameBoardContainer);
  CreteElmentsInBoard(yourBoardContainer);
  for (let x = 0; x < yourBoard.length; x++) {
    for (let y = 0; y < yourBoard[x].length; y++) {
      const elem = yourBoard[x][y];
      if (elem == 1) {
        document.getElementById("p" + x + y).style.background = "black";
      }
    }
  }

}