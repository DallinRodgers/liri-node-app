require("dotenv").config();
var Spotify = require("node-spotify-api");

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

const whatToDo = process.argv[2];

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
