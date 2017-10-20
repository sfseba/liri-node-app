//new assignment challenge.
var fs = require("fs"); // read & write in random.txt
var request = require("request");
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var userInput = process.argv[2];
var client = new Twitter(keys.twitterKeys);
var colors = require('colors');
// ------------ //
switch(userInput) {
  case "my-tweets": myTweets();
  break;
  case "spotify-this-song": spotifyThisSong();
  break;
  case "movie-this": movieThis();
  break;
  case "do-what-it-says": doWhatItSays();
  break;
  default: console.log("\r\n" +"plz type one of following command" + "\r\n" +
"1. my-tweets" + "\r\n" +
"2. spotify-this-song "+"\r\n" +
"3. movie-this " +"\r\n" +
"4. do-what-it-says" + "\r\n");
};
//functions-------------------------------------------------------

//  *****  sporify   *****
function spotifyThisSong(songTitle) {
  var songTitle = process.argv[3];
  if(!songTitle){
    songTitle = "sexy back";
  }
  params = songTitle;

 var spotify = new Spotify({
  id: 'a8cd3ae7f185476ab2135c77821d8a79',
  secret: 'a5c1f7b843c147b2b9ed880a68d553b4'
});

  spotify.search({ type: "track", query: params, limit:20 }, function(err, data) {
    if(!err){
      var songInfo = data.tracks.items;
      for (var i = 0; i < 5; i++) {
        if (songInfo[i] != undefined) {
          var spotifyResults =
          "Artist: " + songInfo[i].artists[0].name + "\r\n" +
          "Song: " + songInfo[i].name + "\r\n" +
          "Album the song is from: " + songInfo[i].album.name + "\r\n" +
          "Preview Url: " + songInfo[i].preview_url + "\r\n" +
          "\n" +
          "***************************** " + i + " *****************************" + "\r\n";
          console.log(colors.green(spotifyResults));
          log(spotifyResults);// calling log function
        }
      }
    }	else {
      console.log("Error :"+ err);
      return;
    }
  });
  // spotify.search({ type: "track", query: params, limit:20 }, function(err, data) {
  //   if(err) {
  //     console.log("Error :" + err);
  //   } else {
  //     var songInfo = data.tracks.items[0];
  //     var songResult = console.log(songInfo.artists[0].name + "\n" + songInfo.name + "\n" + songInfo.album.name +
  //   "\n" + songInfo.preview_url);
  //
  //     console.log(songResult);
  //   }
  // });
}; // 28 closed

// ***** OMDB function first code example start *****
function movieThis() {

var inputMovie = process.argv;
if(!inputMovie){
   inputmovie = "mr.nobody";
}
var movieName = "";
for (var i=3; i< inputMovie.length; i++){
 if (i >3 && i < inputMovie.length){
   movieName = movieName+ "+" + inputMovie[i];
 }  else {
   movieName += inputMovie[i];
 }
}

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&r=json&apikey=40e9cece";

request(queryUrl, function(error, response, body) {
  if(!error && response.statusCode === 200){
    var moviesDetail = JSON.parse(body);
    var result = "\n" + "***************************" +
    "\nTitle: " + moviesDetail.Title +
    "\nThe Movie released: " + moviesDetail.Year +
    "\nCountry Produced: " + moviesDetail.Country +
    "\nLanguage: " + moviesDetail.Language +
    "\nPlot: " + moviesDetail.Plot +
    "\nActors: " + moviesDetail.Actors +
    '\nIMDB Rating: '+ moviesDetail.imdbRating +
    '\nRotten Tomato Rating: '+ moviesDetail.tomatoRating +
    // There's been changes to the OMDB API that will require an update to UMS for Rotten Tomatoes scraping to work again.
    // related an article https://forum.kodi.tv/showthread.php?tid=311047
    // related an article https://www.patreon.com/posts/rating-changes-8417367
    "\nRottenTomatoes Url: " + moviesDetail.tomatoURL;
    console.log(result);
    log(result);
  } else {
    console.log("Error: " + error);
  }
});
//****** second code case start line *******

// var inputMovie = process.argv;
//    if(!inputMovie){
//       inputmovie = "mr. nobody";
// }
// var movieName = "";
// for (var i=3; i< inputMovie.length; i++){
//  if (i >3 && i < inputMovie.length){
//    movieName = movieName+ "+" + inputMovie[i];
//  }  else {
//    movieName += inputMovie[i];
//  }
// }
// //params = movieName;
// request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json&tomatoes=true&apikey=40e9cece", function(error, response, body) {
//
//   // If the request is successful (i.e. if the response status code is 200)
//   if (!error && response.statusCode === 200) {
//
//     var movieDetail = JSON.parse(body);
//     var movieResult = "title: "+ movieDetail.Title + "\r\n" +
//     "year: "+ movieDetail.Year+"\r\n"+
//     "Imdb Rating: "+movieDetail.Country + "\r\n" +
//     "Country: " + movieDetail.Country+ "\r\n" +
//     "Language: " + movieDetail.Language+ "\r\n" +
//     "Plot: " + movieDetail.Plot + "\r\n" +
//     "Actors: " + movieDetail.Actors + "\r\n" +
//     "Rotten Tomatoes Rating: " + movieDetail.tomatoRating + "\r\n" +
//     "Rotten Tomatoes URL: " + movieDetail.tomatoURL + "\r\n" +
//     "-------------------------------" + "\n";
//     console.log(movieResult);
//     //log(movieResult); //calling log function
//   }
//   else {
//     console.log("Error :" + error);
//     return;
//   }
// });
// ****** second case endline ******
} // line 75 closed

// ****** Tweet function ****
function myTweets() {
  var client = new Twitter({
       consumer_key: keys.twitterKeys.consumer_key,
			 consumer_secret: keys.twitterKeys.consumer_secret,
			 access_token_key: keys.twitterKeys.access_token_key,
			 access_token_secret: keys.twitterKeys.access_token_secret,
		});
    var twitterUserName = process.argv[3];
    var params = {screen_name: "droxey"};
    client.get("statuses/user_timeline", params, function(
    error, tweets, response) {
    if (!error) {
     for (var i = 0; i < 20; i++) {
      console.log(colors.blue(tweets[i].created_at, "\n", tweets[i].text));
      log(tweets[i].created_at, "\n", tweets[i].text);
    }
  }
});
    // if(!twitterUserName){
    //   twitterUserName = "bohyeonan1"
    // }

    // client.get("statuses/user_timeline/", params, function(error, data, response){
    //   if(!error) {
    //     for(var i=0; i <data.length; i++) {
    //       var twitterResult =
    //       "@" + data[i].user.screen_name +": " +
    //       data[i].text + "\r\n" +
    //       data[i].created_at + "\r\n" +
    //       i + "\r\n";
    //       console.log(twitterResult);
    //       log(twitterResult);
    //     }
    //   }
    //   else {
    //     console.log("Error: " + error);
    //     return;
    //   }
    // });

  //     console.log(tweets)
  //   });
}; //closed line 154

//do what it says function
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(error, data){
    if (!error) {
      doWhatItSaysResults = data.split(",");
      spotifyThisSong(doWhatItSaysResults[0], doWhatItSaysResults[1]);
    } else {
      console.log("Error occurred" + error);
    }
  });
};
// Do What It Says function, uses the reads and writes module to access the log.txt file and write everything that returns in terminal in the log.txt file
function log(logResults) {
  fs.appendFile("log.txt", logResults, (error) => {
    if(error) {
      throw error;
    }
  });
}
