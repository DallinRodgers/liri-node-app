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

        console.log(artists);
        console.log(songName);
        console.log(trackLink);
        console.log(album);
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

        console.log(artists);
        console.log(songName);
        console.log(trackLink);
        console.log(album);
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

        console.log(title);
        console.log(year);
        console.log(imdbRating);
        console.log(rottenTomatoesRating);
        console.log(country);
        console.log(language);
        console.log(plot);
        console.log(actors);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }
}
