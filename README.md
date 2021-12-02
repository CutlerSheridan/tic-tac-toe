# Tic-Tac-Toe
## A simple tic-tac-toe game
In progress.

#### TO-DO NEXT
- add ability to start new game
#### TO-DO LATER
##### Features
- add ability to input name, et cetera
- add display for name, et cetera
- add computer player w/ AI that knows best move to make next
- add "easy" option that randomly selects next move
##### Behavior
- remember games won/tied upon refresh
- create a line through the winning sequence
##### Style
- choose fonts
- style grid
-if clicked, indent and leave marker; if space is taken, indent as current marker and leave as-is
##### Other
- decide if that nestedForLoop function is worthwhile (look through other instances of where i'll need to use it)

#### DONE
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
