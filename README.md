# Tic-Tac-Toe
## A simple tic-tac-toe game
In progress.

#### TO-DO NEXT
- add ability to reset all games
#### TO-DO LATER
##### Features
- add ability to start new game
- add ability to input name, et cetera
- add computer player w/ AI that knows best move to make next
- add "easy" option that randomly selects next move
##### Behavior
- remember games won/tied upon refresh
- create a line through the winning sequence
- mobile; don't allow ios tapping after game is complete
    - should it still highlight if the tapped square is not empty? or different color maybe
##### Style
- choose fonts
- style grid
- if clicked, indent and leave marker; if space is taken, indent as current marker and leave as-is
- add italicized indication of whether player is human- or computer-controlled
- mobile; disable double tap to zoom
- add a visual indication as to whose turn it is?  maybe just if both players are human?
- should background of board be transparent?  I mean probably, right?
- make game pieces unselectable
##### Other
- decide if that nestedForLoop function is worthwhile (look through other instances of where i'll need to use it)

#### DONE
- *v0.1.2*
- break up _runGame() into discrete funcs so Reset Match can interrupt the game and it doesn't try running _runGame() again simultaneously
- make Reset Match button work
- *v0.1.1*
- make mobile buttons respond appropriately
- add display for name, et cetera
- add Reset Match button
- *v0.1.0*
- add ability to win a game
- add ability to tie a game
- *v0.0.1*
- set up file boilerplate
- get grid to show up
- adjust sizing and styles so it's testable
- hover over space, show player's greyed-out marker--or should entire space highlight?
- make it so clicking a square adds a mark
- make it so clicking doesn't do the action more times each time--this has to be the event listener not removing when it's supposed to _(it was--gotta use a handler to be able to remove it)
- make it so clicking a square adds *correct* mark
- make it so you can only mark empty squares
