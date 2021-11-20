const gameParts = (() => {
    let board = [
        ["_", "_", "_"],
        ["_", "_", "_"],
        ["_", "_", "_"]
    ];
    const clearBoard = () => {
        for (let i = 0; i < 3; i++) {
            for (let n = 0; n < 3; n++) {
                board[i][n] = "_";
            }
        }
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
    const evaluate = (board, targetMark) => {
        // const oppoMark = (targetMark === p1.mark ? p2.mark : p1.mark);
        // return -10, 0, or 10
        // should this be in gameParts?  Part of gameParts.board?
    };
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
            console.log("p1 turn start of _startTurn", _isP1Turn);

            currentPlayer = _isP1Turn ? _p1 : _p2;
            console.log("mark pre-assign", mark);
            mark = currentPlayer.mark;
            console.log("mark post-assign", mark);
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
            const result = evaluate(gameParts.board, mark);
            if (result >= 0) {
                _endGame(result === 0 ? null : currentPlayer);
                return;
            }
            console.log("p1 turn pre-switch", _isP1Turn);
            console.log("mark in _endTurn", mark);
            _isP1Turn = !_isP1Turn;
            console.log("p1 turn post-switch", _isP1Turn);
            displayController.spaces.forEach(space => space.removeEventListener("click", _endTurn));
            _startTurn();
        }
        _startTurn();
    };
    const _endGame = (winner) => {
        // increment games won of player or tied
        // call showGameOutcome
    };
    setupGame();
    return {setupGame, evaluate};
})();

