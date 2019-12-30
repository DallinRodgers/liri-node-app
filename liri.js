require("dotenv").config();
var Spotify = require("node-spotify-api");
const axios = require("axios");
var fs = require("fs");

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var omdb = keys.omdv;

const whatToDo = process.argv[2];
if (whatToDo === "spotify-this-song") {
  let spotifySong = process.argv[3];
  spotifyThisSong(spotifySong);
} else if (whatToDo === "movie-this") {
  let thisMovie = process.argv[3];
  movieThisMovie(thisMovie);
}

///////////////////////////
// Spotify API
///////////////////////////
function spotifyThisSong(songToSpotify) {
  if (songToSpotify !== undefined) {
    spotify
      .search({ type: "track", query: songToSpotify })
      .then(function(response) {
        const track = response.tracks;
        const items = track.items[0];
        const songName = items.name;
        const album = items.album.name;
        const artists = items.artists[0].name;
        const trackLink = items.album.external_urls.spotify;

        printSpotify(artists, songName, trackLink, album);
      })
      .catch(function(err) {
        console.log(err);
      });
  } else {
    spotify
      .request("https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE")
      .then(function(response) {
        // console.log(response);
        const track = response;
        const songName = track.name;
        const album = track.album.name;
        const artists = track.artists[0].name;
        const trackLink = track.album.external_urls.spotify;

        printSpotify(artists, songName, trackLink, album);
      })
      .catch(function(err) {
        console.log(err);
      });
  }
}
///////////////////////////
// OMDb API
///////////////////////////
function movieThisMovie(thisMovie) {
  // Make a request for a user with a given ID
  if (thisMovie !== undefined) {
    axios
      .get(`http://www.omdbapi.com/?apikey=f97cbe0b&t=${thisMovie}`)
      .then(function(response) {
        // handle success
        const movieResults = response.data;
        const title = movieResults.Title;
        const year = movieResults.Year;
        const imdbRating = movieResults.Ratings[0].Value;
        const rottenTomatoesRating = movieResults.Ratings[1].Value;
        const country = movieResults.Country;
        const language = movieResults.Language;
        const plot = movieResults.Plot;
        const actors = movieResults.Actors;

        printOMDb(
          title,
          year,
          imdbRating,
          rottenTomatoesRating,
          country,
          language,
          plot,
          actors
        );
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  } else {
    movie = "Mr. Nobody";
    axios
      .get(`http://www.omdbapi.com/?apikey=f97cbe0b&t=${movie}`)
      .then(function(response) {
        // handle success
        const movieResults = response.data;
        const title = movieResults.Title;
        const year = movieResults.Year;
        const imdbRating = movieResults.Ratings[0].Value;
        const rottenTomatoesRating = movieResults.Ratings[1].Value;
        const country = movieResults.Country;
        const language = movieResults.Language;
        const plot = movieResults.Plot;
        const actors = movieResults.Actors;

        printOMDb(
          title,
          year,
          imdbRating,
          rottenTomatoesRating,
          country,
          language,
          plot,
          actors
        );
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }
}
///////////////////////////
// Do Whatever
///////////////////////////
if (whatToDo === "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    if (dataArr[0] === "spotify-this-song") {
      spotifyThisSong(dataArr[1]);
    }
  });
}

function printSpotify(artists, songName, trackLink, album) {
  console.log(`Artista: ${artists}`);
  console.log(`Song Name: ${songName}`);
  console.log(`Link to Song: ${trackLink}`);
  console.log(`Album: ${album}`);
}

function printOMDb(
  title,
  year,
  imdbRating,
  rottenTomatoesRating,
  country,
  language,
  plot,
  actors
) {
  console.log(`Title: ${title}`);
  console.log(`Year: ${year}`);
  console.log(`IMDb Rating: ${imdbRating}`);
  console.log(`Rotten Tomatoes Ratting: ${rottenTomatoesRating}`);
  console.log(`Country: ${country}`);
  console.log(`Language: ${language}`);
  console.log(`Plot: ${plot}`);
  console.log(`Actors: ${actors}`);
}
