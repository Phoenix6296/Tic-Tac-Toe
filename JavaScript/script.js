// INITIALISING NECESSARY STUUFS
const statusDisplay = document.querySelector('.game--status');
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningMessage = () => `-- ${currentPlayer} WON --`;
const drawMessage = () => `! DRAW !`;
const currentPlayerTurn = () => `-- ${currentPlayer}'s turn --`;

//SCORE BOARD
let result = { 'win': 0, 'lose': 0, 'draw': 0 };
statusDisplay.innerHTML = currentPlayerTurn();

//SOUND EFFECT
const hitSound = new Audio('../Utilities/Sound/hit.mp3');
const winSound = new Audio('../Utilities/Sound/win.mp3');
const drawSound = new Audio('../Utilities/Sound/draw.mp3');

//HANDLES CELL THAT IS ALREADY OCCUPIED
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

//HANDLES CELL CLICK
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index')
    );
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
    hitSound.play();
}

// WINNING CRITERIA
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//LOGIC OF THE GAME
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        winSound.play();
        if (currentPlayer === 'O') {
            result['lose']++;
            document.getElementById('lose').innerHTML = result['lose'];
        }
        if (currentPlayer === 'X') {
            result['win']++;
            document.getElementById('win').innerHTML = result['win'];
        }
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        result['draw']++;
        document.getElementById('draw').innerHTML = result['draw'];
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        drawSound.play();
        return;
    }
    handlePlayerChange();
}


//CHANGE PLAYER AFTER EACH TURN
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

//RESET GAME ON CLICKING RESET BUTTON
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);