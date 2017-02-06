$(document).ready(function() {

    // Setup game.
    config.yellowPlayerName = prompt("Please enter the first player's name. This player will use yellow game pieces.", config.yellowPlayerName) || config.yellowPlayerName;
    config.redPlayerName = prompt("Please enter the second player's name. This player will use red game pieces.", config.redPlayerName) || config.redPlayerName;

    appendToAuditLog(new Date() + "\t" + config.yellowPlayerName + " and " + config.redPlayerName + " played a game.");
    printAuditLog();

    $('.prefix').text(config.playerPrefix);
    $('#player').addClass(currentPlayer).text(config[currentPlayer + "PlayerName"]);

    // Trigger the game sequence by clicking on a position button on the board.
    $('.board button').click(function(e) {
        // Detect the x and y position of the button clicked.
        var y_pos = $('.board tr').index($(this).closest('tr'));
        var x_pos = $(this).closest('tr').find('td').index($(this).closest('td'));

        // Ensure the piece falls to the bottom of the column.
        y_pos = dropToBottom(x_pos, y_pos);

        if (positionIsTaken(x_pos, y_pos)) {
            alert(config.takenMsg);
            return;
        }

        addDiscToBoard(currentPlayer, x_pos, y_pos);
        printBoard();

        // Check to see if we have a winner.
        if (verticalWin() || horizontalWin() || diagonalWin()) {
            // Destroy the click listener to prevent further play.
            $('.board button').unbind('click');
            $('.prefix').text(config.winPrefix);
            $('.play-again').show("slow");
            addScore(config[currentPlayer + "PlayerName"]);
            appendToAuditLog(new Date() + "\t" + config[currentPlayer + "PlayerName"] + " won.");
            return;

        } else if (gameIsDraw()) {
            // Destroy the click listener to prevent further play.
            $('.board button').unbind('click');
            $('.message').text(config.drawMsg);
            $('.play-again').show("slow");
            appendToAuditLog(new Date() + "\t" + config.yellowPlayerName + " and " + config.redPlayerName + " played a draw.");
            return;
        }

        changePlayer();
    });

    $('.play-again').click(function(e) {
        location.reload();
    });



});
