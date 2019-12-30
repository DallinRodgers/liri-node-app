require("dotenv").config();
var Spotify = require("node-spotify-api");

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

const whatToDo = process.argv[2];
console.log(whatToDo);

if (whatToDo === "spotify-this-song") {
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
}
