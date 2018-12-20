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
        square.id = 's' + j + i;

        // set each grid square's coordinates: multiples of the current row or column number
        var topPosition = j * squareSize;
        var leftPosition = i * squareSize;

        // use CSS absolute positioning to place each grid square on the page
        square.style.top = topPosition + 'px';
        square.style.left = leftPosition + 'px';
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
]


//Генерация целого числа в определенном диапазоне
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function GenerateShips() {
    //Ставим линкорн
    gameBoard[getRandomInt(0, rows)][getRandomInt(0, rows)] = 1;

    console.log("x=" + x);

    console.log("y=" + y);

}
//проверка пустоты занятость ячейки
function ChechShip(x,y) {
    if(gameBoard[x][y]==1){
        return false;
    }
    else return true;
}

function Lincorn(range) {
    
    x=getRandomInt(0,rows-1);
    y=getRandomInt(0,rows-1);
    var horizontal = Math.random() >= 0.5;
    //направление корабля
    if (horizontal=true){
        //отмека корабля на поле 
        for (let index = 0; index < range; index++) {
            let size=y+index; 
            if(0<=size<=9){
                if (ChechShip(x,size)){
                    gameBoard[x][size]=1;
                }
            }
            else{
                
            }
            
            
        }   
        if(y+1==10){
            y=y-1
            gameBoard[x][y]=1;
        }
    }

    if (range > 1) {
        for (let index = 0; index < range; index++) {

        }
    }

}