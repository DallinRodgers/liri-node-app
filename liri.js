require("dotenv").config();
var Spotify = require("node-spotify-api");
const axios = require("axios");

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var omdb = keys.omdv;

const whatToDo = process.argv[2];

///////////////////////////
// Spotify API
///////////////////////////
if (whatToDo === "spotify-this-song") {
  if (process.argv[3] !== undefined) {
    let songToSpotify = process.argv[3];

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

if (whatToDo === "movie-this") {
  // Make a request for a user with a given ID
  if (process.argv[3] !== undefined) {
    const movie = process.argv[3];
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
