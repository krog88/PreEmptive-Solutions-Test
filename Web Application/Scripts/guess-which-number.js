// Create a pseudonamespace to avoid global collisions
var GAN = {};
GAN.gameId = 1;
GAN.playGuid = '';
GAN.magicNum = 0;
GAN.guessNum = 0;

// Generate a guid for this game
GAN.generatePlayGuid = function() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	    return v.toString(16);
	});
}

// Initialize a new game
GAN.initGame = function() {
	$('#StatusMsg').text('Let\'s Play!');
	$('#UserGuess').focus();
	$('#UserGuess').select();
	GAN.playGuid = GAN.generatePlayGuid();
	GAN.magicNum = Math.floor(Math.random() * 101) + 1;	
}

// Prepare game turn data for sending to server via ajax PUT
GAN.UserGuessmapDataForAjax = function(guess) {
	var fd = new FormData();
	fd.append('gameId', GAN.gameId);
	fd.append('playGuid', GAN.playGuid);
	fd.append('guessNum', GAN.guessNum);
	fd.append('guess', guess);
	fd.append('magicNum', GAN.magicNum);

	return fd;
}

// Process the user's input
GAN.processGuess = function(guess) {
	var msg = "Guess #" + ++GAN.guessNum + " is " + guess + ": ";

	if (guess > GAN.magicNum) msg += "Too high";
	else if (guess < GAN.magicNum) msg += "Too low";
	else msg += "Correct!";

	// Mock an ajax web service endpoint
	$.mockjax({
	  url: '/gameservice/endpoint',
	  responseTime: 750,
	  responseText: {
	    status: 'success',
	    fortune: 'Are you a turtle?'
	  }
	});

	// Send the user's game and turn to the server via ajax
	$.ajax({
		url: "/gameservice/endpoint",
		type: "PUT",
		data: GAN.UserGuessmapDataForAjax,
		processData: false,
		success: function(){
    		// Do nothing. Fire and forget.
  		}
	});	

	// Prepare UI for quick keyboard input
	$('#UserGuess').focus();
	$('#UserGuess').select();

	return msg;
}

$(function() {

	// Initialize the first game
	GAN.initGame();

	// Bind to the form submit button
	$('#GameForm').submit(function(event) {
		event.preventDefault();
		var f = $('#GameForm');

		// Validate input
		if (f.valid()) {
			// Input is valid. Process the turn.
			$('#StatusMsg').text( GAN.processGuess( $('#UserGuess').val() ) );
		}

	 	return false;
	});

	// Bind to New Game link
	$('#NewGame').click(function() {
		// Initialize a new game
		GAN.initGame();
	})
});

