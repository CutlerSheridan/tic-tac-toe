# Tic-Tac-Toe
## A simple tic-tac-toe game
In progress.

#### TO-DO NEXT
- currently setting the specific color to revert to after new match for winning highlighted row/col
- change color of winning row/col or winning marks
- add ability to edit name, et cetera
#### TO-DO LATER
##### Features
- add hard AI that knows best move to make next
- add medium AI that only checks for two marks in a row, else does random
##### Behavior
- remember games won/tied upon refresh
- mobile; don't allow ios tapping after game is complete
    - should it still highlight if the tapped square is not empty? or different color maybe
##### Style
- choose fonts
- style grid
- should p1 and p2 groups go to the left and right on desktop, top and bottom on mobile?
- if clicked, indent and leave marker; if space is taken, indent as current marker and leave as-is
- italicize indication of whether player is human- or computer-controlled
- mobile; disable double tap to zoom
- add a visual indication as to whose turn it is?  maybe just if both players are human?
- should background of board be transparent?  I mean probably, right?
- create a line through the winning sequence?
- make game pieces unselectable
- handle long names
##### Other
- decide if that nestedForLoop function is worthwhile (look through other instances of where i'll need to use it)
##### Maybe

#### DONE
- *v0.2.1*
- add _highlightSquare() and unhighlightAll()
- *v0.2.0*
- get info-items to justify
- add computer player w/ "easy" AI
- add difficulty indicator in info panel
- *v0.1.4*
- add ability to reset all games
- *v0.1.3*
- Make Reset Match button change to Next Match once the game is over; change back once next one starts
- make info panel display accurate info
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
