let spotify = require('spotify');
let Twitter = require('twitter');
let request = require('request');
let fs = require("fs");
let input = process.argv[2];
let requestID = process.argv[3];

logFunction();

const keys = require('./keys.js');

console.log("process.argv[4]: " + process.argv[4]);

if (process.argv[4]) {

	requestID = requestIdManipulator();
		
	}

switch (input) {

	case "my-tweets":
	twitterFunction();
	break;

	case "spotify-this-song":
	spotifyFunction( requestID );
	break;

	case "movie-this":
	movieFunction( requestID );
	break;

	case "do-what-it-says":
	randTxtFunction();
	break;
}


function twitterFunction() {

const keyLink = keys.twitterKeys;

var client = new Twitter({
  consumer_key: keyLink.consumer_key,
  consumer_secret: keyLink.consumer_secret,
  access_token_key: keyLink.access_token_key,
  access_token_secret: keyLink.access_token_secret
});

console.log("consumer_key: " + keyLink.consumer_key)

var params = {screen_name: '@StrudelDoog'}; // George Dickinson   @StrudelDoog

// console.log(client);
// console.log(client.get);

client.get('statuses/user_timeline', { params, count: 20 }, function(error, tweets, response) {
	for (var i = 0; i < tweets.length && i < 20; i++) {
		console.log(tweets[i].text);
		console.log(tweets[i].created_at);
	}
   // console.log(tweets[1].text);
   fs.appendFile("random.txt", tweets, function(err) {
    				if (err) {
      				return console.log(err);
				    }
				  });
    if (error) {
    	console.log("Error occured: " + error);
    	return;
    }

});

}

function spotifyFunction( songName ) {

	// .get('https://accounts.spotify.com/authorize', function(code)){
	// 	console.log(code);
	// }
	spotify.get

	spotify.search({ type: 'track', query: songName }, function(err, data) {
		console.log(data);
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
	// get: function(data, hollaback) {}

    // Do something with 'data' 
});
}

function movieFunction( movieTitle ) {

	if (!movieTitle) {
		movieTitle = "Mr Nobody"
	}
	
	request('http://www.omdbapi.com/?apikey=40e9cece&t=' + movieTitle, function (error, response, body) {

		let film = JSON.parse(body);

		console.log(film.Title);
		console.log(film.Year);
		console.log(film.imdbRating);
		console.log(film.Country);
		console.log(film.Language);
		console.log(film.Plot);
		console.log(film.Actors);

	});

}

function randTxtFunction() {

	fs.readFile("random.txt", "utf8", function(err, data) {
		data = data.split(",");

		input = data[0].trim();
		requestID = data[1].trim();

		switch (input) {

			case "my-tweets":
			twitterFunction();
			break;

			case "spotify-this-song":
			spotifyFunction( requestID );
			break;

			case "movie-this":
			movieFunction( requestID );
			break;

			case "do-what-it-says":
			randTxtFunction();
			break;
		}
	});
}

function logFunction() {

	if (!process.argv[3]) {
		fs.appendFile("log.txt", process.argv[2] + ", ");
	} else {

	fs.appendFile("log.txt", process.argv[2] + " " + process.argv[3] + ", ");

	}
}

function requestIdManipulator() {

	let fileName;
	let wholeInput = process.argv;

	fileName = wholeInput.slice(3, wholeInput.length);
	fileName = fileName.toString();
	fileName = fileName.replace(/,/g, " ");

	return fileName;
}