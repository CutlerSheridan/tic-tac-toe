const gameParts = (() => {
    let board = [
        ["_", "_", "_"],
        ["_", "_", "_"],
        ["_", "_", "_"]
    ];
    const clearBoard = () => {
        // for (let i = 0; i < 3; i++) {
        //     for (let n = 0; n < 3; n++) {
        //         board[i][n] = "_";
        //     }
        // }
        const emptyBoard = (row, col) => {
            board[row][col] = "_";
        };
        nestedForLoop(emptyBoard);

        displayController.clearBoardDisplay();
    };
    let gamesTied = 0;
    const Player = (name, isHuman, mark, gamesWon = 0) => {
        const _Move = () => {
            let row, col;
            return {row, col};
        };
        const findBestMove = (board) => {
            // *** "player" parameter prob. unnecessary now that it's in Player()
            // replace empty space w/ player.mark
            // call _minimax();
            // call makeMove() using best move
        };
        const _minimax = (board, depth, isMax, alpha, beta) => {
            // gameFlow.evaluate();
            // add logic here
        };
        const makeMove = (move) => {
            board[move.row][move.col] = mark;
            console.log({
                board
            });
            displayController.displayMark(move, mark);
        };
        return {name, isHuman, mark, gamesWon, findBestMove, makeMove};
    };
    return {board, clearBoard, gamesTied, Player};
})();

const displayController = (() => {
    (function _createDOMBoard() {
        let boardFragment = document.createDocumentFragment();
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const newSpace = document.createElement("div");
                newSpace.classList.add("space");
                newSpace.dataset.boardLoc = `${row},${col}`;
                newSpace.textContent = " ";
                boardFragment.append(newSpace);
            }
        }
        const boardElement = document.querySelector(".game-board");
        boardElement.append(boardFragment);
    })();
    const spaces = document.querySelectorAll(".space");
    const clearBoardDisplay = () => {
        spaces.forEach(space => space.textContent = " ");
    }
    // func called startScreen() 
        // _editForm(true);
    // func called hoverBehavoir IF i don't just highlight squares w/ CSS
    // func called inputBehavior (mark) (also, do I need)
    const displayMark = (move, mark) => {
        const space = document.querySelector(`.space[data-board-loc="${move.row},${move.col}"`);
        space.textContent = mark;
    }
    return {clearBoardDisplay, spaces, displayMark};
})();

const gameFlow = (() => {
    const _p1 = gameParts.Player("Player 1", true, "X");
    const _p2 = gameParts.Player("Player 2", true, "O");
    
    const setupGame = (form) => {
        // assign info from form to p1 and p2
        gameParts.clearBoard();
        // if reset checked, both gamesWon + gameParts.gamesTied = 0
        _runGame();
    };
    const _runGame = () => {
        let _isP1Turn = true;
        let currentPlayer;
        let mark;
        const _startTurn = () => {
            currentPlayer = _isP1Turn ? _p1 : _p2;
            mark = currentPlayer.mark;
            if (!currentPlayer.isHuman) {
                currentPlayer.findBestMove(gameParts.board);
                _endTurn();
            } else {
                displayController.spaces.forEach(space => space.addEventListener("click", _endTurn));
            }
        };
        const _endTurn = (e) => {
            if (e) {
                const boardIndex = e.target.dataset.boardLoc.split(",");
                const move = {
                    row: boardIndex[0],
                    col: boardIndex[1]
                };
                if (gameParts.board[move.row][move.col] !== "_") {
                    return;
                }
                currentPlayer.makeMove(move);
            }
            displayController.spaces.forEach(space => space.removeEventListener("click", _endTurn));
            const result = evaluate(mark);
            if (result > 0 || result < 0) {
                _endGame(currentPlayer);
                return;
            } else if (!_movesAreLeft()) {
                _endGame(null);
                return;
            }
            _isP1Turn = !_isP1Turn;
            _startTurn();
        }
        _startTurn();
    };
    const _endGame = (winner) => {
        if (winner) {
            console.log(`${winner.name} wins!`);
        } else {
            console.log("Tie!");
        }
        // increment games won of player or tied
        // call showGameOutcome
    };

    const evaluate = (targetMark) => {
        const oppoMark = targetMark === _p1.mark ? _p2.mark : _p1.mark;
        for (let row = 0; row < 3; row++) {
            if (gameParts.board[row][0] === gameParts.board[row][1] &&
                gameParts.board[row][1] === gameParts.board[row][2]) {
                    if (gameParts.board[row][0] === targetMark) {
                        return 10;
                    } else if (gameParts.board[row][0] === oppoMark) {
                        return -10;
                    }
                }
        }
        for (let col = 0; col < 3; col++) {
            if (gameParts.board[0][col] === gameParts.board[1][col] &&
                gameParts.board[1][col] === gameParts.board[2][col]) {
                    if (gameParts.board[0][col] === targetMark) {
                        return 10;
                    } else if (gameParts.board[0][col] === oppoMark) {
                        return -10;
                    }
                }
        }
        if (gameParts.board[0][0] === gameParts.board[1][1] &&
            gameParts.board[1][1] === gameParts.board[2][2]) {
                if (gameParts.board[1][1] === targetMark) {
                    return 10;
                } else if (gameParts.board[1][1] === oppoMark) {
                    return -10;
                }
            }
        if (gameParts.board[0][2] === gameParts.board[1][1] &&
            gameParts.board[1][1] === gameParts.board[2][0]) {
                if (gameParts.board[1][1] === targetMark) {
                    return 10;
                } else if (gameParts.board[1][1] === oppoMark) {
                    return -10;
                }
            }
        return 0;
    };
    const _movesAreLeft = () => {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (gameParts.board[row][col] === "_") {
                    return true;
                }
            }
        }
        return false;
    };
    setupGame();
    return {setupGame, evaluate};
})();

function nestedForLoop(func) {
    for (let i = 0; i < 3; i++) {
        for (let n = 0; n < 3; n++) {
            func(i, n);
        }
    }
}