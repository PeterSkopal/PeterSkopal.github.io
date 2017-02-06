/*
* Create variables used in the game
*/
var config = {
        yellowPlayerName: "Player 1",
        redPlayerName: "Player 2",
        startingPlayer: "yellow", // Choose 'yellow' or 'red'.
        takenMsg: "This position is already taken. Please make another choice.",
        drawMsg: "This game is a draw.",
        playerPrefix: "Current Player is: ",
        winPrefix: "The winner is: ",
        countToWin: 4,
    };
/*
* Define the empty board as a two-dimensional array, full of zeros. In our
* game, 0 represents empty, 'red' represents a red disc, and 'yellow' represents
* a yellow disc.
*/
var board = [[0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0]];

/*
* Sets the starting player
*/
var currentPlayer = config.startingPlayer;
