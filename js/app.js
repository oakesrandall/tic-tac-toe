var winningNumbers = [7, 56, 448, 73, 146, 292, 273, 84];
var currentPlayer = "x";
var numberOfTurns = 0;

var score = {
	x: 0,
	o: 0,
	};
	
//creates function that resets variables and board
function startNewGame() {
	console.log("you want to start a new game");
	//sets current player to x, since x always goes first
	currentPlayer = "x";
	//sets number of turns to 0 since we're watching
	//for 9 moves without a win (draw)
	numberOfTurns = 0;
	score = {x: 0, o: 0};
	//resets board by changing inner HTML of box class
	//elements to blank
	var temp = document.querySelectorAll(".box");
	for (var i = 0; i < temp.length; i++) {
		temp[i].innerHTML = "";
	}
	removeNoClick();
}

//runs the startNewGame function after page loads
window.addEventListener("load", function() {
	console.log("page is loaded, game on!");
	startNewGame();
});

function removeNoClick() {
	var temp = document.querySelectorAll(".box");
	for (var i = 0; i < temp.length; i++) {
		temp[i].classList.remove("avoidClicks");
	}
}

//listens for a click of the reset button
//clears the board and resets stats (startNewGame)
document.getElementById("resetButton").addEventListener("click", function() {
	console.log("you clicked the reset button");
	startNewGame();
});


//captures the value (ID) of the square that was clicked
//makes the clicked square unclickable

function replyClick(clickedId) {
	document.getElementById(clickedId).innerHTML = "<p>" + currentPlayer.toUpperCase() + "</p>";
	document.getElementById(clickedId).classList.add("avoidClicks");
	score[currentPlayer] += parseInt(clickedId);
	numberOfTurns += 1;
	setTimeout(function() {
    	if (hasWon(score[currentPlayer])) {
			alert(currentPlayer.toUpperCase() + " wins!!! Click OK to start another game.");
			startNewGame();
		}
		else if (numberOfTurns === 9) {
			alert("The game is a draw! Click OK to start another game.");
			startNewGame();
		} else {
			currentPlayer = currentPlayer === "x" ? "o" : "x";	
		}
	}, 100);
}

function hasWon(score) {
      for (var i = 0; i < winningNumbers.length; i++) {
        if ( (winningNumbers[i] & score) === winningNumbers[i] ) {
          return true;
        }
      }
      return false;
}




