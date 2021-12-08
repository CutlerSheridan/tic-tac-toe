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
    let totalGames = 0;
    const Player = (name, isHuman, mark, difficulty, gamesWon = 0) => {
        const _Move = () => {
            let row, col;
            return {row, col};
        };
        const makeMove = (move) => {
            board[move.row][move.col] = mark;
            console.log({
                board
            });
            displayController.displayMark(move, mark);
        };
        const findRandomMove = () => {
            let move = {
                row: null,
                col: null
            };
            do {
                move.row = Math.floor(Math.random() * 3);
                move.col = Math.floor(Math.random() * 3);
            } while (board[move.row][move.col] !== "_");
            makeMove(move);
        }
        const findBestMove = () => {
            // *** "player" parameter prob. unnecessary now that it's in Player()
            // replace empty space w/ player.mark
            // call _minimax();
            // call makeMove() using best move
        };
        const _minimax = (board, depth, isMax, alpha, beta) => {
            // gameFlow.evaluate();
            // add logic here
        };
        return {name, isHuman, mark, difficulty, gamesWon, findRandomMove, findBestMove, makeMove};
    };
    return {board, clearBoard, gamesTied, totalGames, Player};
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
        spaces.forEach(space => {
            space.textContent = " ";
            space.ontouchstart = function() {
                this.style.backgroundColor = "darkred";
            }
            space.ontouchend = function() {
                this.style.backgroundColor = "red";
            }
        });
    }
    const updateInfoDisplay = (playerArray) => {
        for (let i = 1; i < 3; i++) {
            const p = playerArray[i - 1];
            document.getElementById(`p${i}-name`).textContent = p.name;
            document.getElementById(`p${i}-type`).textContent = p.isHuman ? "Human" : `Comp. (${p.difficulty})`;
            document.getElementById(`p${i}-score`).textContent = p.gamesWon;
            document.getElementById("games-tied-num").textContent = gameParts.gamesTied;
            document.getElementById("total-games-num").textContent = gameParts.totalGames;
        }
    }
    // func called startScreen() 
        // _editForm(true);
    // func called hoverBehavoir IF i don't just highlight squares w/ CSS
    // func called inputBehavior (mark) (also, do I need)
    const displayMark = (move, mark) => {
        const space = document.querySelector(`.space[data-board-loc="${move.row},${move.col}"`);
        space.textContent = mark;
    }

    const highlightWinner = (winningStreaks = [{row: false, col: false, diag: false}]) => {
        console.log("reaches highlightWinner()");
        if (typeof winningStreaks[0].row === "number") {
            for (let i = 0; i < 3; i++) {
                _highlightSquare({row: winningStreaks[0].row, col: i});
            }
        }
    }
    const _highlightSquare = (move) => {
        const square = document.querySelector(`.space[data-board-loc="${move.row},${move.col}"]`);
        square.style.background = "darkgreen";
        console.log("reaches highlightWinner() > _highlightSquare");
    }
    const unhighlightAll = () => {
        const root = document.querySelector(":root");
        const defaultColor = root.style.getPropertyValue("--clr-pri");
        spaces.forEach(space => space.style.background = defaultColor);
    }
    return {clearBoardDisplay, spaces, updateInfoDisplay, displayMark, highlightWinner, unhighlightAll};
})();

const gameFlow = (() => {
    const _p1 = gameParts.Player("Player 1", true, "X");
    const _p2 = gameParts.Player("Player 2", false, "O", "easy");

    let _isP1Turn;
    let currentPlayer;
    let mark;
    
    const setupGame = (form) => {
        // assign info from form to p1 and p2
        // also maybe put the form somewhere else in this module so this can be 
        displayController.updateInfoDisplay( [_p1, _p2] );
        displayController.unhighlightAll();
        _isP1Turn = true;
        currentPlayer = _p1;
        mark = _p1.mark;
        _resetMatchButton.textContent = "Reset match"
        gameParts.clearBoard();
        // if reset checked, both gamesWon + gameParts.gamesTied = 0
        _startTurn();
    };
    const _startTurn = () => {
        displayController.spaces.forEach(space => space.removeEventListener("click", _endTurn));
        currentPlayer = _isP1Turn ? _p1 : _p2;
        mark = currentPlayer.mark;
        if (!currentPlayer.isHuman) {
            setTimeout(() => {
                if (currentPlayer.difficulty === "easy") {
                    currentPlayer.findRandomMove();
                }
                else if (currentPlayer.difficulty === "hard") {
                    currentPlayer.findBestMove();
                }
                _endTurn();
            }, 250);
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
    const _endGame = (winner) => {
        if (winner) {
            console.log(`${winner.name} wins!`);
            winner.gamesWon++;
        } else {
            console.log("Tie!");
            gameParts.gamesTied++;
        }
        gameParts.totalGames++;
        _resetMatchButton.textContent = "Next match";
        displayController.updateInfoDisplay( [_p1, _p2] );
        displayController.highlightWinner([{row: 0}]);
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
    const _clearAllGames = () => {
        _p1.gamesWon = 0;
        _p2.gamesWon = 0;
        gameParts.gamesTied = 0;
        gameParts.totalGames = 0;
        setupGame();
    };
    const _resetMatchButton = document.getElementById("reset-match");
    _resetMatchButton.addEventListener("click", setupGame);
    const _clearAllGamesButton = document.getElementById("clear-all-games");
    _clearAllGamesButton.addEventListener("click", _clearAllGames);
    
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