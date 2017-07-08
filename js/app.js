//messing with jQuery refactoring up here.

// function GameState(name, value) {
// 	this.name = value;
// }

// var winningNumbers = new GameState (winningNumbers, [7, 56, 448, 73, 146, 292, 273, 84]);

// var currentPlayer = new GameState (currentPlayer, "x");

// var numberOfTurns = new GameState (numberOfTurns, 0);

// var score = new GameState (score, { x: 0, o: 0});

// GameState.prototype = {
// 	hasWon: function(score) {
// 		for (var i = 0; i < GameState.winningNumbers.length; i++) {
// 	        if ( (GameState.winningNumbers[i] & GameState.score) === GameState.winningNumbers[i] ) {
// 	          return true;
// 	        }
// 	    }
// 	    return false;
// 	},

// 	switchPlayer: function() {
// 		currentPlayer = currentPlayer === "x" ? "o" : "x";
// 	},

// 	removeNoClick: function() {
// 	var temp = document.querySelectorAll(".box");
// 		for (var i = 0; i < temp.length; i++) {
// 			temp[i].classList.remove("avoidClicks");
// 		}
// 	},

// 	noClicks: function() {
// 	document.getElementById(clickedId).classList.add("avoidClicks");
// 	}
// };




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
	removeBrad();
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

//shows gif of Brad Pitt dancing
function showBrad() {
	document.getElementById("winner").setAttribute("style", "display: block");
	document.getElementById("winningCheer").play();

}

//removes gif of Brad Pitt dancing
function removeBrad() {
	document.getElementById("winner").setAttribute("style", "display: none");
}
//captures the value (ID) of the square that was clicked
//makes the clicked square unclickable
//checks the score and number of turns to determine a win or draw
function replyClick(clickedId) {
	document.getElementById(clickedId).innerHTML = "<p>" + currentPlayer.toUpperCase() + "</p>";
	document.getElementById(clickedId).classList.add("avoidClicks");
	score[currentPlayer] += parseInt(clickedId);
	numberOfTurns += 1;
	setTimeout(function() {
    	if (hasWon(score[currentPlayer])) {
    		showBrad();
    		setTimeout(function() {
				alert(currentPlayer.toUpperCase() + " wins!!! Click OK to start another game.");
				startNewGame();
			}, 4000);
		}
		else if (numberOfTurns === 9) {
			document.getElementById("drawSad").play();
			setTimeout(function() {
				alert("The game is a draw! Click OK to start another game.");
				startNewGame();
			}, 4000);
		} else {
			currentPlayer = currentPlayer === "x" ? "o" : "x";	
		}
	}, 100);
}


//checks the score using bitwise AND(which is pretty freaking cool BTW)
function hasWon(score) {
    for (var i = 0; i < winningNumbers.length; i++) {
        if ( (winningNumbers[i] & score) === winningNumbers[i] ) {
          return true;
        }
    }
    return false;
}



