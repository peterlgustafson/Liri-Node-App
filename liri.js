//To read and set any environment variables with the dotenv package
require("dotenv").config();

//To Grab API Key info from Keys.JS file
//For OMDB API...
var keys = require("./keys.js");

//For Spotify API
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

//For Twitter API
var Twitter = require('twitter');

var client = new Twitter(keys.twitter);

//Function to Console Log all Search Return Data and Append to Log.txt file
var logWrite = function (inputString) {
    console.log(inputString);
    //Function to append file
    fs.appendFile("./log.txt", inputString + "\n", function (err) {
    });
}

//Global Variables for User Command Input and Search
var userCommand = process.argv[2];

var userInput = process.argv;
var userSearch = "";

for (var i = 3; i < userInput.length; i++) {
    userSearch += userInput[i] + " ";
};

//For OMDB API

//Overall Function to run at Switch Statement based on User Command
var runOMDB = function (fullMovieName) {

    //To make http calls
    var request = require("request");

    // Grab or assemble the movie name and store it in a variable called "movieName"
    var movieName = parseInt(process.argv[3]);
    var fullMovieNameArray = process.argv;

    // If Else Statement to Log Mr Nobody as User Command if blank or undefined
    if (fullMovieName === "" || (fullMovieName === undefined)) {
        fullMovieName = "Mr Nobody";
    };

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + fullMovieName + "&y=&plot=short&tomatoes=true&apikey=" + keys.omdb;

    // Then create a request to the queryUrl
    request(queryUrl, function (error, response, body) {
        if (error) {
            logWrite(error);

            // If the request is successful
        } else {
            //Convert response body from string to object
            var responseBodyObject = JSON.parse(body);

            // Then log the Title, Release Year, Rating, Country, Language, Plot & Actors for the movie
            var movieString = "-------------------------------------------------" + "\nMovie title: " + responseBodyObject.Title + "\nRelease year: " + responseBodyObject.Released + "\nIMDB rating: " + responseBodyObject.imdbRating + "\nRotten Tomatoes rating: " + responseBodyObject.tomatoRating + "\nProduced in: " + responseBodyObject.Country + "\nLanguage(s): " + responseBodyObject.Language + "\nPlot: " + responseBodyObject.Plot + "\nActors/Actresses: " + responseBodyObject.Actors + "\n-------------------------------------------------";
            logWrite(movieString);
        };
    });
};

//For Twitter API

//Overall Function to run at Switch Statement based on User Command
var runTwitter = function () {

    var params = { screen_name: 'peterstestacct', count: 20 };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            // For Loop to Loop thru all tweets and print text and created at date
            for (var i = 0; i < tweets.length; i++) {
                var tweetString = "-------------------------------------------------" + "\nTweet: " + tweets[i].text + "\nTweeted on: " + tweets[i].created_at + "\n-------------------------------------------------";
                logWrite(tweetString);
            }
        }
    });
}

//For Spotify API

//Overall Function to run at Switch Statement based on User Command
var runSpotify = function (trackSearch) {
    //If Statement to Log The Sign Ace of Base as User Command if blank or undefined
    if (trackSearch === "" || (trackSearch === undefined)) {
        trackSearch = "The Sign Ace of Base";
    };

    spotify.search({ type: 'track', query: trackSearch }, function (err, data) {
        if (err) {
            return logWrite('Error occurred: ' + err);
        }
        var spotifyString = "-------------------------------------------------" + "\nArtist: " + data.tracks.items[0].artists[0].name + "\nSong Name: " + data.tracks.items[0].name + "\nLink to Preview Song: " + data.tracks.items[0].preview_url + "\nAlbum Name: " + data.tracks.items[0].album.name + "\n-------------------------------------------------";
        logWrite(spotifyString);
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
    //Function to read file
    fs.readFile("./random.txt", "utf8", function (err, data) {
        var incomingArray = data.split(",");
        userCommand = incomingArray[0];
        userSearch = incomingArray[1];
        checkUserInput();
    });
} else {
    checkUserInput();
};