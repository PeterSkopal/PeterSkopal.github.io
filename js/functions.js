/**
 * A function for adding a disc to our Connect Four board.
 *
 * @param string color, The color of the current player.
 * @param int x_pos, The x-position of the location chosen.
 * @param int y_pos, The y-position of the location chosen.
 */
function addDiscToBoard(color, x_pos, y_pos) {
    board[y_pos][x_pos] = color;
}

/**
 * Print the contents of the `board` variable to the html page.
 */
function printBoard() {
    // Loop through the board, and add classes to each cell for the
    // appropriate colors.
    for (var y = 0; y <= 5; y++) {
        for (var x = 0; x <= 6; x++) {
            if (board[y][x] !== 0) {
                var cell = $("tr:eq(" + y + ")").find('td').eq(x);
                cell.children('button').addClass(board[y][x]);
            }
        }
    }
}

/**
 * A function for changing players at the end of a turn.
 */
function changePlayer() {
    // Change the value of our player variable.
    if (currentPlayer === 'yellow') {
        currentPlayer = 'red';
    } else {
        currentPlayer = 'yellow';
    }
    // Update the UI.
    $('#player').removeClass().addClass(currentPlayer).text(config[currentPlayer + "PlayerName"]);
}

/**
 * If there are empty positions below the one disc chosen, return the new y-position
 * we should drop the piece to.
 *
 * @param int x_pos, The x-position of the location chosen.
 * @param int y_pos, The y-position of the location chosen.
 * @return bool returns true or false for the question "Is this at the bottom?".
 */
function dropToBottom(x_pos, y_pos) {
    // Start at the bottom of the column, and step up, checking to make sure
    // each position has been filled. If one hasn't, return the empty position.
    for (var y = 5; y > y_pos; y--) {
        if (board[y][x_pos] === 0) {
            return y;
        }
    }
    return y_pos;
}

/**
 * Test to ensure the chosen location isn't taken.
 *
 * @param int x_pos, The x-position of the location chosen.
 * @param int y_pos, The y-position of the location chosen.
 * @return bool returns true or false for the question "Is this spot taken?".
 */
function positionIsTaken(x_pos, y_pos) {
    var value = board[y_pos][x_pos];
    return value === 0 ? false : true;
}

/**
 * Determine if the game is a draw (all peices on the board are filled).
 *
 * @return bool Returns true or false for the question "Is this a draw?".
 */
function gameIsDraw() {
    for (var y = 0; y <= 5; y++) {
        for (var x = 0; x <= 6; x++) {
            if (board[y][x] === 0) {
                return false;
            }
        }
    }
    // No locations were empty. Return true to indicate that the game is a draw.
    return true;
}

/**
 * Test to see if somebody got four consecutive horizontal pieces.
 *
 * @return bool Returns true if a win was found, and otherwise false.
 */
function horizontalWin() {
    var currentValue = null,
        previousValue = 0,
        tally = 0;
    // Scan each row in series, tallying the length of each series. If a series
    // ever reaches four, return true for a win.
    for (var y = 0; y <= 5; y++) {
        for (var x = 0; x <= 6; x++) {
            currentValue = board[y][x];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            } else {
                // Reset the tally if you find a gap.
                tally = 0;
            }
            if (tally === config.countToWin - 1) {
                return true;
            }
            previousValue = currentValue;
        }
        // After each row, reset the tally and previous value.
        tally = 0;
        previousValue = 0;
    }
    // No horizontal win was found.
    return false;
}

/**
 * Test to see if somebody got four consecutive vertical pieces.
 *
 * @return bool Returns true if a win was found, and otherwise false.
 */
function verticalWin() {
    var currentValue = null,
        previousValue = 0,
        tally = 0;
    // Scan each column in series, tallying the length of each series. If a
    // series ever reaches four, return true for a win.
    for (var x = 0; x <= 6; x++) {
        for (var y = 0; y <= 5; y++) {
            currentValue = board[y][x];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            } else {
                // Reset the tally if you find a gap.
                tally = 0;
            }
            if (tally === config.countToWin - 1) {
                return true;
            }
            previousValue = currentValue;
        }
        // After each column, reset the tally and previous value.
        tally = 0;
        previousValue = 0;
    }
    // No vertical win was found.
    return false;
}

/**
 * Test to see if somebody got four consecutive diagonel pieces.
 *
 * @return bool Returns true if a win was found, and otherwise false.
 */
function diagonalWin() {
    var x = null,
        y = null,
        xtemp = null,
        ytemp = null,
        currentValue = null,
        previousValue = 0,
        tally = 0;
    // Test for down-right diagonals across the top.
    for (x = 0; x <= 6; x++) {
        xtemp = x;
        ytemp = 0;
        while (xtemp <= 6 && ytemp <= 5) {
            currentValue = board[ytemp][xtemp];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            } else {
                // Reset the tally if you find a gap.
                tally = 0;
            }
            if (tally === config.countToWin - 1) {
                return true;
            }
            previousValue = currentValue;
            // Shift down-right one diagonal index.
            xtemp++;
            ytemp++;
        }
        // Reset the tally and previous value when changing diagonals.
        tally = 0;
        previousValue = 0;
    }

    // Test for down-left diagonals across the top.
    for (x = 0; x <= 6; x++) {
        xtemp = x;
        ytemp = 0;
        while (0 <= xtemp && ytemp <= 5) {
            currentValue = board[ytemp][xtemp];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            } else {
                // Reset the tally if you find a gap.
                tally = 0;
            }
            if (tally === config.countToWin - 1) {
                return true;
            }
            previousValue = currentValue;
            // Shift down-left one diagonal index.
            xtemp--;
            ytemp++;
        }
        // Reset the tally and previous value when changing diagonals.
        tally = 0;
        previousValue = 0;
    }

    // Test for down-right diagonals down the left side.
    for (y = 0; y <= 5; y++) {
        xtemp = 0;
        ytemp = y;
        while (xtemp <= 6 && ytemp <= 5) {
            currentValue = board[ytemp][xtemp];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            } else {
                // Reset the tally if you find a gap.
                tally = 0;
            }
            if (tally === config.countToWin - 1) {
                return true;
            }
            previousValue = currentValue;
            // Shift down-right one diagonal index.
            xtemp++;
            ytemp++;
        }
        // Reset the tally and previous value when changing diagonals.
        tally = 0;
        previousValue = 0;
    }

    // Test for down-left diagonals down the right side.
    for (y = 0; y <= 5; y++) {
        xtemp = 6;
        ytemp = y;
        while (0 <= xtemp && ytemp <= 5) {
            currentValue = board[ytemp][xtemp];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            } else {
                // Reset the tally if you find a gap.
                tally = 0;
            }
            if (tally === config.countToWin - 1) {
                return true;
            }
            previousValue = currentValue;
            // Shift down-left one diagonal index.
            xtemp--;
            ytemp++;
        }
        // Reset the tally and previous value when changing diagonals.
        tally = 0;
        previousValue = 0;
    }
    // No diagonal wins found. Return false.
    return false;
}

/**
 * Prints the highest score where the winning factor is the amount of won games.
 */
function makeHighscorelist() {
//  localStorage.clear()
  // Runs through the localStorage to find the highest score
  if (typeof(Storage) !== undefined) {
    var highest = 0;
    var highest_key = undefined;
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      if (key !== 'auditLog') {
        var nbr = localStorage.getItem(key);
        if (nbr > highest) {
          highest = nbr;
          highest_key = key;
        }
      }
    }
    // Prints the highscore, or if there's no highscore, a message that says there's no highscore
    if (highest_key !== undefined) {
      document.getElementById("highscores").innerHTML = highest_key + "\t - \t" + localStorage.getItem(highest_key) + " wins";
    } else {
      document.getElementById("highscores").innerHTML = "No highscore exists yet";
    }
  }

  //Writes all the players and the amount of wins in the console.
  console.log("Scores:");
  for (var i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) !== 'auditLog') {
        console.log(localStorage.key(i) + ", " + localStorage.getItem(localStorage.key(i)));
    }
  }
}

/**
 * Adds a player to the HTML localStorage and add up the amount of wins.
 *
 * @param String player_name, the winning players name
 */
function addScore(player_name) {
  //checks if the player name already exists in the localStorage
  var exists = false;
  for (var i = 0; i < localStorage.length; i++) {
    if (player_name === localStorage.key(i)) {
      exists = true;
    }
  }
  if (exists) {
    localStorage.setItem(player_name, parseInt(localStorage.getItem(player_name)) + 1);
  } else {
    localStorage.setItem(player_name, 1);
  }
}

/**
 * Prints the auditLog in the console window.
 */
 function printAuditLog() {
   console.log("Audit Log:");
   for (var i = 0; i < localStorage.length; i++) {
     if (localStorage.key(i) === 'auditLog') {
       console.log(localStorage.getItem(localStorage.key(i)));
     }
   }
 }

 /**
  * Appends data to the localStorage, specifically made for the auditLog in this case.
  *
  * @param String data, the new input for the auditLog
  */
  function appendToAuditLog(data) {
    var oldData = localStorage.getItem('auditLog');
    if(oldData === null) {
      oldData = "";
    }
    localStorage.setItem('auditLog', oldData + data + '\n');
  }
