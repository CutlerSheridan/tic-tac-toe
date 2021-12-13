# Tic-Tac-Toe
## A simple tic-tac-toe game
Play tic-tac-toe against a human or computer opponent!  Choose the difficulty setting!  Work in progress.

#### TO-DO NEXT
- add hard AI that knows best move to make next

#### TO-DO LATER
##### Features
- add medium AI that only checks for two marks in a row, else does random
##### Behavior
- form; auto-fill starting names into form?
- form; should only one "resets games" warning be visible for each player?  or good to show both?
- fix mobile highlighted streak unhighlighting a square if you touch it
- make board uninteractable upon someone winning?  just on mobile?
- remember players' info upon refresh
##### Style
- style checkboxes in form
- should p1 and p2 groups go to the left and right on desktop, top and bottom on mobile?
    - or maybe all at the top but like, a heading for player names then the next line is "name    vs.    name", et cetera, then buttons can go below the grid
- add a visual indication as to whose turn it is?  maybe just if both players are human?
- handle long names
- decide if highlighted squares should have a black border
##### Other
- add beep sounds?
##### Maybe

#### DONE
- *v0.4.3*
- make starting difficulty checked for human as well
- form; make difficulty selection available only if "computer" is checked; greyed out otherwise
- *v0.4.2*
- add ability to edit name + if player is computer
- form; warn user if games will reset from changing opponent type
- form; have reset warning disappear after submission so it's not there next time
- make all games reset if human/comp or difficulty is changed
- make next match start correctly if both computer players
- fix warning visibility so it doesn't accrue eventListeners
- warn user games will reset if changing difficulty
- *v0.4.1*
- fix positioning of difficulty selector
- write function to display/hide form
- *v0.4.0*
- create form to customize game
- add name fields
- style form
- style text input fields so they don't shift around upon focus
- add human/computer selection
- add difficulty selection
- style radio buttons
- get difficulty selection underlines to remain motionless upon selection/deselection but not have the diagonal lines present when three sides of the border are simply transparent
- *v0.3.3*
- change game space divs into buttons so I can disable double-tap to zoom on mobile
- mobile; disable double tap to zoom
- make game pieces unselectable
- adjust shade of black
- *v0.3.2*
- fix desktop so marks are black when square is highlighted
- *v0.3.1*
- fix touch buttons so they color appropriately
- *v0.3.0*
- settle on style direction
- choose font
- choose color scheme
- style grid
- style info panels
- style buttons
- switch ontouch instances to event listeners
- get rid of nestedForLoop()
- move buttons to under grid
- make buttons equal sizes
- move space touch listener creation from clearBoardDisplay() to _createDOMBoard()
- *v0.2.2*
- change color of winning row/col/diag streak (or winning marks?) even if multiple streaks
- *v0.2.1*
- add _highlightSquare() and unhighlightAll(), set the stage for highlighting winners
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
