const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame(){
  cells.forEach(cell => cell.addEventListener("click", cellClicked));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}

function cellClicked(){
  const cellIndex = this.getAttribute("cellIndex");

  if(options[cellIndex] != "" || !running){
    return;
  }

  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index){
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer(){
  currentPlayer = (currentPlayer == "X") ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
  let roundWon = false;

  for(let i = 0; i < winConditions.length; i++) {
    const cell1 = options[winConditions[i][0]];
    const cell2 = options[winConditions[i][1]];
    const cell3 = options[winConditions[i][2]];

    if(cell1 == "" || cell2 == "" || cell3 == ""){
      continue;
    }

    if(cell1 === cell2 && cell2 === cell3) {
      roundWon = true;
      break;
    }
  }

  if(roundWon){
    statusText.textContent = `${currentPlayer} wins!`;
    running = false;
  }
  else if(!options.includes("")){
    statusText.textContent = `Draw!`;
    running = false;
  }
  else{
    changePlayer();
  }
}

function restartGame(){
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach(cell => cell.textContent = "");
  running = true;
}
