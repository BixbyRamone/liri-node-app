let spotify = require('spotify');
let Twitter = require('twitter');
let request = require('request');
let fs = require("fs");
let input = process.argv[2];
let requestID = process.argv[3];

const keys = require('./keys.js');

console.log(keys);

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

	request('http://www.omdbapi.com/?apikey=40e9cece&t=' + movieTitle, function (error, response, body) {

		let film = JSON.parse(body);
		// var filmArray = ['Title', 'Year', 'imdbRating', 'Country', 'Language', 'Plot', 'Actors'];

		// console.log(film.filmArray[0]);

		// for (var i = 0; i < filmArray.length; i++) {
		// 	let filmAttriubte = filmArray[i];
		// 	console.log(film.filmAttriubte);
		// }
		// console.log(film);

		console.log(film.Title);
		console.log(film.Year);
		console.log(film.imdbRating);
		console.log(film.Country);
		console.log(film.Language);
		console.log(film.Plot);
		console.log(film.Actors);

	});

}