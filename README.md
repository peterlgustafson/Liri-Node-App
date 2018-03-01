# Liri-Node-App

Link to Github repository: https://github.com/peterlgustafson/Liri-Node-App

About: LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

The App: ![alt "Image of Liri"](/images/liri.png)

Description: The user is able to enter the following commands in their terminal and get the following data back.
- my-tweets -> will return the last 20 tweets and the post date for each tweet on from Peter's test Twitter account
- spotify-this-song '<song name here>' -> will return the following data on the song you entered
     - Artist Name
     - Song Name
     - Preview link
     - Album name
- movie-this '<movie name here>' -> will return the following data on the movie you entered
     - Movie title
     - Year the movie came out
     - IMDB rating of the movie
     - Rotten Tomatoes rating of the movie
     - Country where the movie was produced
     - Language of the movie
     - Plot of the movie
     - Actors/actresses in the movie
- do-what-it-says -> will take the text within the random.txt file and use it to call one of Liri's commands
     - By default, will search "I Want It That Way" by the Backstreet Boys

Technologies Used: Node.JS, NPM Package Manager & APIs.
