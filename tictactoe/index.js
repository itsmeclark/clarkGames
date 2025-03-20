const cells = document.querySelectorAll('.cell');
const statusText  = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

const winConditions = [
    [0, 1, 2],   // Horizontal
    [3, 4, 5],  // Horizontal
    [6, 7, 8], // Horizontal
    [0, 3, 6], // Vertical
    [1, 4, 7], // Vertical
    [2, 5, 8], // Vertical
    [0, 4, 8],   // Diagonal
    [2, 4, 6]  // Diagonal
]

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
let winner = false;
// intialize the game
// Add event listeners to cells
// Add event listener to restart button 
// Set running to true
// Set status text to "Player X's turn"
// Set currentPlayer to "X"
// Set options to ["", "", "", "", "", "", "", "", ""]
// Loop through each cell and add event listener
// When a cell is clicked, call cellClick function
// Add event listener to restart button
// When restart button is clicked, call restartGame function
// Set running to true
// Set status text to "Player X's turn"
//  Set currentPlayer to "X"
intializeGame()
function intializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClick));
    restartBtn.addEventListener("click", restartGame);
    running = true;
    statusText.innerHTML = "Player X's turn";
    currentPlayer = "X";
    winner = false;
}
function changePlayer(){
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}
function cellClick(){
    const cell = this.getAttribute("cellIndex");
    if(!running || options[cell] !== ""){
        return;
    }
    cells[cell].innerHTML = currentPlayer;
    options[cell] = currentPlayer;
    checkWinner();
   
}

function checkWinner(){
    winConditions.forEach((condition) => {
        const firstCell = options[condition[0]];
        const secondCell = options[condition[1]];
        const thirdCell = options[condition[2]];
        if(firstCell === "" || secondCell === "" || thirdCell === ""){
            return;
        }else if(firstCell === secondCell && secondCell === thirdCell){
            statusText.textContent = `Player ${currentPlayer} wins!`;
            winner = true;
            running = false;
        }
    });
    if(!options.includes("")){
        statusText.textContent = "It's a tie!";
        running = false;
    }else if(winner === false){
        changePlayer();
    }

    
}

function restartGame(){
    cells.forEach(cell => cell.innerHTML = "");
    options = ["", "", "", "", "", "", "", "", ""];
    intializeGame();
}