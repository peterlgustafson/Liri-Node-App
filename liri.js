//To read and set any environment variables with the dotenv package
require("dotenv").config();

//Variables for User Input and Search
var userInput = process.argv;
var userSearch = "";

for (var i = 3; i < userInput.length; i++) {
    userSearch += userInput[i] + " ";
}

var userCommand = process.argv[2];

//For Movies/OMDB API

var runOMDB = function (fullMovieName) {

    var request = require("request");

    // Grab or assemble the movie name and store it in a variable called "movieName"
    var movieName = parseInt(process.argv[3]);
    var fullMovieNameArray = process.argv;
    var fullMovieName = "";

    if (fullMovieName === "" || (fullMovieName === undefined)) {
        fullMovieName = "Mr Nobody";
    }

    for (var i = 3; i < fullMovieNameArray.length; i++) {
        fullMovieName = fullMovieName + fullMovieNameArray[i] + " ";
    }

    // console.log(fullMovieName);

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + fullMovieName + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    // console.log(queryUrl);

    // Then create a request to the queryUrl
    request(queryUrl, function (error, response, body) {
        if (error) {
            console.log(error);

            // If the request is successful
        } else {
            //Convert response body from string to object
            var responseBodyObject = JSON.parse(body);

            // Then log the Title, Release Year, Rating, Country, Language, Plot & Actors for the movie
            console.log("Movie title: " + responseBodyObject.Title);
            console.log("Release year: " + responseBodyObject.Year);
            console.log("IMDB rating: " + responseBodyObject.Ratings[0].Value);
            console.log("Rotten Tomatoes rating: " + responseBodyObject.Ratings[1].Value);
            console.log("Produced in: " + responseBodyObject.Country);
            console.log("Language(s): " + responseBodyObject.Language);
            console.log("Plot: " + responseBodyObject.Plot);
            console.log("Actors/Actresses: " + responseBodyObject.Actors);
        }

    });

}

//For Twitter API

var runTwitter = function () {

    var Twitter = require('twitter');

    var client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

    var params = { screen_name: 'peterstestacct', count: 20 };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            // For Loop to Loop thru all tweets and print text and created at date
            for (var i = 0; i < tweets.length; i++) {
                console.log("Tweet text: " + tweets[i].text);
                console.log("Created Date: " + tweets[i].created_at);
            }
        }
    });
}

//For Spotify API

var runSpotify = function (trackSearch) {
    if (trackSearch === "" || (trackSearch === undefined)) {
        trackSearch = "The Sign Ace of Base";
    }
    var Spotify = require('node-spotify-api');

    var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });

    spotify.search({ type: 'track', query: trackSearch }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Link to Preview Song: " + data.tracks.items[0].preview_url);
        console.log("Album Name: " + data.tracks.items[0].album.name);
    });
}

//Switch Statement to Read User Command and Run appropriate function
var checkUserInput = function () {
    switch (userCommand) {
        case "spotify-this-song":
            runSpotify(userSearch);
            break;
        case "my-tweets":
            runTwitter(userSearch);
            break;
        case "movie-this":
            runOMDB(userSearch);
            break;
    }
}

//For Do What it Says Command
var fs = require("fs");

//if user com = do-it
if (userCommand === "do-what-it-says") {
    fs.readFile("./random.txt", "utf8", function (err, data) {
        var incomingArray = data.split(",");
        userCommand = incomingArray[0];
        userSearch = incomingArray[1];
        checkUserInput();
    });
} else {
    checkUserInput();
};