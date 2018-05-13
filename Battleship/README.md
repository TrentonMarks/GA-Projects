PROJECT 1 -- Using HTML, CSS, JavaScript, and jQuery, create a two-player game that is play in the DOM.

NAME: TRENTON MARKS

GAME: BATTLESHIP GALACTICA

LINK:  https://TrentonMarks.github.io/Battleship/

TECHNOLOGIES USED: HTML, CSS, JavaScript, jQuery


GAME OVERVIEW

Inspired by the boardgame "Battleship", this game features two opposing gameboards; the User's and the AI's.  Each board is made up of a 5X5 grid.  At the start of the game, each board will carry three ships that have been placed randomly.  The length of each board's three ships are two, three, and four sqaures, respectively.  The game is initialized when the user fires the first shot.  Neither opponent has an advantage over the other, though, as the AI will always fire the last shot.  This allows for a draw.  The goal of the game is to destroy each ship on the opponent's board.  


GAMEPLAY

To start, the User must click on any square of the AI's gameboard.  The selected square will be the first target.  If the square is "Occupied" by a ship, the square will then turn red and be classed as "Hit".  If the square is "Empty", the square will then disappear and be classed as "Missed".  Every time a board has been fired on, it will be redrawn with the DIVs' new assigned classes.  This is in order to "save" the boards' new statuses after each change.  The AI fires at a random square that has not previously been fired at after the User fires their shot.  The game advances in this back-and-forth manner until one, or both of the boards' ships have been destroyed.  Each new game, both boards will start with 9 "Occupied" squares.  Once a board has been "Hit" 9 times, this will trigger the "Game Over" event.  At the end of the game, a "You Lose" message replaces the losing board.  The User then has the option to click "Play Again".


BUGS TO FIX

1) Ships are never placed horizontally on either gameboard.
2) If the User clicks on the same sqaure twice, it counts as a turn.
3) If the User clicks a square on the AI's gameboard after a defeat, an infinite loop will be triggered.


IMPROVEMENTS TO MAKE

1) Choose a theme (space, pirate, tanks, battleships, etc.).
2) Add CSS and Animations (titles, headers, popup messages, etc.).
3) Create game navigation (start game button, directions button, restart button, etc.).
4) Alert when a ship has been destroyed (ally or enemy).
5) Afer the User fires, set a 1-3 second timeout before the AI fires.
