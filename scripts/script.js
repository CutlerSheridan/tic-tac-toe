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
    let totalGames = 0;
    const Player = (name, isComp, mark, difficulty, gamesWon = 0) => {
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
        return {name, isComp, mark, difficulty, gamesWon, findRandomMove, findBestMove, makeMove};
    };
    return {board, clearBoard, gamesTied, totalGames, Player};
})();

const displayController = (() => {
    (function _createDOMBoard() {
        let boardFragment = document.createDocumentFragment();
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const newSpace = document.createElement("button");
                newSpace.classList.add("space");
                newSpace.dataset.boardLoc = `${row},${col}`;
                newSpace.textContent = " ";
                newSpace.addEventListener("touchstart", (e) => {;
                    e.target.style.background = "var(--clr-pri)";
                    e.target.style.color = "var(--clr-sec)";
                });
                newSpace.addEventListener("touchend", (e) => {
                    e.target.style.background = "var(--clr-sec)";
                    e.target.style.color = "var(--clr-pri)";
                });
                boardFragment.append(newSpace);
            }
        }
        const boardElement = document.querySelector(".game-board");
        boardElement.append(boardFragment);
    })();
    (function _addTouchButtonEffects () {
        const buttons = document.querySelectorAll("button");
        buttons.forEach(button => {
            button.addEventListener("touchstart", () => {
                button.style.background = "var(--clr-pri)";
                button.style.color = "var(--clr-sec)";
            });
            button.addEventListener("touchend", () => {
                button.style.background = "var(--clr-sec)";
                button.style.color = "var(--clr-pri)";
            })
        })
    })();
    const spaces = document.querySelectorAll(".space");
    const clearBoardDisplay = () => {
        spaces.forEach(space => {
            space.textContent = " ";
        });
    }
    const updateInfoDisplay = (playerArray) => {
        for (let i = 1; i < 3; i++) {
            const p = playerArray[i - 1];
            document.getElementById(`p${i}-name`).textContent = p.name;
            document.getElementById(`p${i}-type`).textContent = p.isComp ? `Comp. (${p.difficulty})` : "Human";
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

    const highlightWinner = (winningStreaks = {row: false, col: false, diag: false}) => {
        console.log("reaches highlightWinner()");
        if (typeof winningStreaks.row === "number") {
            for (let i = 0; i < 3; i++) {
                _highlightSquare({row: winningStreaks.row, col: i});
            }
        }
        if (typeof winningStreaks.col === "number") {
            for (let i = 0; i < 3; i++) {
                _highlightSquare({row: i, col: winningStreaks.col});
            }
        }
        if (typeof winningStreaks.diag === "number") {
            if (winningStreaks.diag === -1 || winningStreaks.diag === 0) {
                for (let i = 0; i < 3; i++) {
                    _highlightSquare({row: i, col: i});
                }
            }
            if (winningStreaks.diag === 1 || winningStreaks.diag === 0) {
                for (let i = 0; i < 3; i++) {
                    _highlightSquare({row: (5 - i) % 3, col: i});
                }
            }
        }
    }
    const _highlightSquare = (move) => {
        const square = document.querySelector(`.space[data-board-loc="${move.row},${move.col}"]`);
        square.style.background = "var(--clr-pri)";
        square.style.color = "var(--clr-sec)";
    }
    const unhighlightAll = () => {
        const root = document.querySelector(":root");
        const defaultBackgroundColor = root.style.getPropertyValue("--clr-sec");
        const defaultTextColor = root.style.getPropertyValue("--clr-pri");
        spaces.forEach(space => {
            space.style.background = defaultBackgroundColor;
            space.style.color = defaultTextColor;
        });
    }
    const toggleFormVisibility = () => {
        gameFlow.form.classList.toggle("invisible");
        for (let i = 1; i < 3; i++) {
            const typeWarning = document.getElementById(`p${i}-type-warning`);
            if (!typeWarning.classList.contains("invisible")) {
                typeWarning.classList.add("invisible");
            }
            const diffWarning = document.getElementById(`p${i}-diff-warning`);
            if (!diffWarning.classList.contains("invisible")) {
                diffWarning.classList.add("invisible");
            }
        }
    }
    const customizeButton = document.getElementById("customize");
    customizeButton.addEventListener("click", toggleFormVisibility);

    return {clearBoardDisplay, spaces, updateInfoDisplay, displayMark, highlightWinner, unhighlightAll, toggleFormVisibility};
})();

const gameFlow = (() => {
    const _p1 = gameParts.Player("Player 1", false, "X", "easy");
    const _p2 = gameParts.Player("Player 2", true, "O", "easy");

    let _isP1Turn;
    let currentPlayer;
    let mark;
    let _winningStreaks = {row: false, col: false, diag: false};
    
    const setupGame = (form) => {
        displayController.updateInfoDisplay( [_p1, _p2] );
        displayController.unhighlightAll();
        _isP1Turn = true;
        currentPlayer = _p1;
        mark = _p1.mark;
        _resetMatchButton.textContent = "Reset match"
        gameParts.clearBoard();
        _startTurn();
    };
    const _startTurn = () => {
        displayController.spaces.forEach(space => space.removeEventListener("click", _endTurn));
        currentPlayer = _isP1Turn ? _p1 : _p2;
        mark = currentPlayer.mark;
        if (currentPlayer.isComp) {
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
            displayController.highlightWinner(_findWinningStreaks());
        } else {
            console.log("Tie!");
            gameParts.gamesTied++;
        }
        gameParts.totalGames++;
        _resetMatchButton.textContent = "Next match";
        displayController.updateInfoDisplay( [_p1, _p2] );
        // call showGameOutcome
    };

    const evaluate = (targetMark) => {
        const oppoMark = targetMark === _p1.mark ? _p2.mark : _p1.mark;
        const b = gameParts.board;
        for (let row = 0; row < 3; row++) {
            if (b[row][0] === b[row][1] && b[row][1] === b[row][2]) {
                    if (b[row][0] === targetMark) {
                        return 10;
                    } else if (b[row][0] === oppoMark) {
                        return -10;
                    }
                }
        }
        for (let col = 0; col < 3; col++) {
            if (b[0][col] === b[1][col] && b[1][col] === b[2][col]) {
                    if (b[0][col] === targetMark) {
                        return 10;
                    } else if (b[0][col] === oppoMark) {
                        return -10;
                    }
                }
        }
        if (b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
                if (b[1][1] === targetMark) {
                    return 10;
                } else if (b[1][1] === oppoMark) {
                    return -10;
                }
            }
        if (b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
                if (b[1][1] === targetMark) {
                    return 10;
                } else if (b[1][1] === oppoMark) {
                    return -10;
                }
            }
        return 0;
    };
    const _findWinningStreaks = () => {
        const b = gameParts.board;
        let streaks = {
            row: false,
            col: false,
            diag: false
        };
        for (let row = 0; row < 3; row++) {
            if (b[row][0] === "_") {
                continue;
            }
            if (b[row][0] === b[row][1] && b[row][1] === b[row][2]) {
                streaks.row = row;
            }
        }
        for (let col = 0; col < 3; col++) {
            if (b[0][col] === "_") {
                continue;
            }
            if (b[0][col] === b[1][col] && b[1][col] === b[2][col]) {
                streaks.col = col;
            }
        }
        if (b[1][1] !== "_") {
            if (b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
                streaks.diag = -1;
            }
            if (b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
                if (streaks.diag === -1) {
                    streaks.diag = 0;
                } else {
                    streaks.diag = 1;
                }
            }
        }
        return streaks;
    }
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
    const clearAllGames = () => {
        _p1.gamesWon = 0;
        _p2.gamesWon = 0;
        gameParts.gamesTied = 0;
        gameParts.totalGames = 0;
        setupGame();
    };
    const _respondToFormInputs = (e) => {
        for (let i = 1; i < 3; i++) {
            if (e.target.id === `p${i}-type-input`) {
                const typeWarning = document.getElementById(`p${i}-type-warning`);
                typeWarning.classList.toggle("invisible");
                document.getElementById(`p${i}-radio-wrapper`).classList.toggle("greyed-out");
            }
            if (e.target.name === `p${i}-difficulty`) {
                const diffWarning = document.getElementById(`p${i}-diff-warning`);
                if (e.target.value !== (i === 1 ? _p1.difficulty : _p2.difficulty)) {
                    diffWarning.classList.remove("invisible");
                } else {
                    diffWarning.classList.add("invisible");
                }
            }
        } 
    }
    const _validateForm = (e) => {
        e.preventDefault();
        // if player type is computer, make sure difficulty is selected
    }
    const _updatePlayersFromForm = (e) => {
        e.preventDefault();
        const playerArray = [_p1, _p2];
        for (let i = 1; i < 3; i++) {
            playerArray[i - 1].name = form.elements[`p${i}-name-input`].value;
            pWasComp = playerArray[i - 1].isComp;
            pOldDifficulty = playerArray[i - 1].difficulty;
            playerArray[i - 1].isComp = form.elements[`p${i}-type-input`].checked;
            playerArray[i - 1].difficulty = form.elements[`p${i}-difficulty`].value;
            if (pWasComp !== form.elements[`p${i}-type-input`].checked ||
            pOldDifficulty !== form.elements[`p${i}-difficulty`].value) {
                clearAllGames();
            }
        }
        
        displayController.updateInfoDisplay(playerArray);
        displayController.toggleFormVisibility();
    }
    const _resetMatchButton = document.getElementById("reset-match");
    _resetMatchButton.addEventListener("click", setupGame);
    const _clearAllGamesButton = document.getElementById("clear-all-games");
    _clearAllGamesButton.addEventListener("click", clearAllGames);

    const form = document.querySelector("form");
    const formInputs = form.elements;
    for (let i = 0; i < formInputs.length; i++) {
        formInputs[i].addEventListener("change", _respondToFormInputs);
    }
    form.addEventListener("submit", _updatePlayersFromForm);
    
    setupGame();
    return {setupGame, evaluate, clearAllGames, form};
})();