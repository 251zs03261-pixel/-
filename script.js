// HTML要素を取得する
const statusElement = document.getElementById('status');
const squares = document.querySelectorAll('.square');
const resetButton = document.getElementById('reset-button');

// ゲームの状態を管理する変数
let currentPlayer = 'X'; // 現在のプレイヤー ('X' or 'O')
let board = Array(9).fill(null); // 盤面の状態
let isGameActive = true; // ゲームが進行中かどうか

// 勝利パターン
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // 横
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // 縦
    [0, 4, 8], [2, 4, 6]             // 斜め
];

// すべてのマス目にクリックイベントを設定する
squares.forEach((square, index) => {
    square.addEventListener('click', () => handleCellClick(square, index));
});

function handleCellClick(clickedSquare, clickedIndex) {
    if (board[clickedIndex] !== null || !isGameActive) {
        return;
    }

    clickedSquare.textContent = currentPlayer;
    board[clickedIndex] = currentPlayer;

    if (checkResult()) {
        return; 
    }

    changePlayer();
}

function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.textContent = `プレイヤー **${currentPlayer}** のターンです`;
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = winCondition[0];
        const b = winCondition[1];
        const c = winCondition[2];

        if (board[a] === null || board[b] === null || board[c] === null) {
            continue;
        }

        if (board[a] === board[b] && board[b] === board[c]) {
            roundWon = true;
            squares[a].style.backgroundColor = 'lightgreen';
            squares[b].style.backgroundColor = 'lightgreen';
            squares[c].style.backgroundColor = 'lightgreen';
            break;
        }
    }

    if (roundWon) {
        statusElement.textContent = `🎉 プレイヤー **${currentPlayer}** の勝利です！`;
        isGameActive = false;
        return true;
    }

    if (!board.includes(null)) {
        statusElement.textContent = `🤝 引き分けです！`;
        isGameActive = false;
        return true;
    }
    
    return false;
}

resetButton.addEventListener('click', resetGame);

function resetGame() {
    currentPlayer = 'X';
    board = Array(9).fill(null);
    isGameActive = true;

    squares.forEach(square => {
        square.textContent = '';
        square.style.backgroundColor = '#fff';
    });

    statusElement.textContent = `プレイヤー **X** のターンです`;
}