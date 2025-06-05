const cells = Array.from(document.querySelectorAll('.container div'));
const statusText = document.getElementById('statusText');
const resetBtn = document.querySelector('button[onclick="resetGame()"]');
const modeToggleBtn = document.getElementById('modeToggle');
const difficultySelect = document.getElementById('difficulty');
const mylabel=document.querySelector('.mylebel');

let currentPlayer = 'X';
let vsComputer = false;
let gameActive = true;
mylabel.style.display='none';
const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleClick(index));
});

function handleClick(index) {
  if (cells[index].textContent !== '' || !gameActive) return;

  makeMove(index, currentPlayer);

  if (vsComputer && currentPlayer === 'O' && gameActive) {
    setTimeout(computerMove, 300);
  }
}

function makeMove(index, player) {
  if (cells[index].textContent === '') {
    cells[index].textContent = player;
    checkWinner();

    if (gameActive) {
      currentPlayer = player === 'X' ? 'O' : 'X';
      statusText.textContent = `PLAYER ${currentPlayer}'S TURN`;
    }
  }
}

function computerMove() {
  const difficulty = difficultySelect.value;

  if (difficulty === 'easy') {
    const emptyIndices = cells
      .map((cell, i) => cell.textContent === '' ? i : null)
      .filter(i => i !== null);
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    makeMove(randomIndex, 'O');
  } else {
    let bestScore = -Infinity;
    let bestMove;

    for (let i = 0; i < 9; i++) {
      if (cells[i].textContent === '') {
        cells[i].textContent = 'O';
        let score = minimax(0, false);
        cells[i].textContent = '';
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    makeMove(bestMove, 'O');
  }
}

function minimax(depth, isMaximizing) {
  let result = checkWinnerSim();
  if (result !== null) {
    const scores = { X: -10, O: 10, Draw: 0 };
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (cells[i].textContent === '') {
        cells[i].textContent = 'O';
        let score = minimax(depth + 1, false);
        cells[i].textContent = '';
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (cells[i].textContent === '') {
        cells[i].textContent = 'X';
        let score = minimax(depth + 1, true);
        cells[i].textContent = '';
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function checkWinnerSim() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    const val = cells[a].textContent;
    if (val && val === cells[b].textContent && val === cells[c].textContent) {
      return val;
    }
  }

  if (cells.every(cell => cell.textContent !== '')) return 'Draw';
  return null;
}

function checkWinner() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[b].textContent === cells[c].textContent
    ) {
      statusText.textContent = `${cells[a].textContent} WINS THE GAME!`;
      gameActive = false;
      highlightWinningCells([a, b, c]);
      return;
    }
  }

  if (cells.every(cell => cell.textContent !== '')) {
    statusText.textContent = "IT'S A DRAW!";
    gameActive = false;
  }
}

function highlightWinningCells(indices) {
  indices.forEach(i => cells[i].classList.add('winning'));
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winning');
  });
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = "PLAYER X'S TURN";
}

modeToggleBtn.addEventListener('click', () => {
  vsComputer = !vsComputer;
  modeToggleBtn.textContent = vsComputer ? "Switch to 2-Player" : "Switch to Vs Computer";
  mylabel.style.display = vsComputer ? 'block' : 'none';
  resetGame();
});
