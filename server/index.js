require('dotenv').config();
const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const lyricFinder = require('lyrics-finder')
const db = require('../database/index.js')

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../public')))
app.use(cors());
app.use(bodyParser.json())

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken
  })

  // clientId, clientSecret and refreshToken has been set on the api object previous to this call.
spotifyApi.refreshAccessToken()
  .then((data) => {
    console.log('The access token has been refreshed!', data.body);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  })
  .catch(() => {
    res.sendStatus(404)
  })
})

app.post('/login', (req, res) => {
    // passing the code from client side
  const code = req.body.code

  // need a token to access the Spotify API
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  })
  // AUTHORIZE THAT WE HAVE A CODE
  spotifyApi.authorizationCodeGrant(code)
    // Below is a promise that returns the
    // access token, refesh token and the expires in time
    // This is what the API returns
    .then(data => {
      console.log('server login data:', data)
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in
      })
    })
    .catch(err => {
      console.log('error at server login', err)
      res.sendStatus(400)
    })
})

app.get('/lyrics', async (req, res) => {
  const lyrics = await lyricFinder(req.query.artist, req.query.track) || 'No lyrics found'
  res.json({lyrics})
})

app.get('/getplaylist', (req, res) => {
  const userEmail = req.query.userEmail
    db.getPlaylist(userEmail, (err, data) => {
      if (err) {
        res.status(404).send(err)
      } else {
        res.status(202).send(data)
      }
    })
})

app.post('/postsong', (req, res) => {
  const artist = req.body.artist
  const title = req.body.title
  const albumUrl = req.body.albumUrl
  const userEmail = req.body.userEmail

    db.postSong({userEmail, artist, title, albumUrl}, (err, data) => {
      if (err) {
        res.status(404).send(err)
      } else {
        res.status(202).send(data)
      }
    })

})

app.put('/removesong', (req, res) => {
  const songTitle = req.body.songTitle
  const userEmail = req.body.userEmail
  console.log("song to be removed:", songTitle, userEmail)

  db.removeSong(songTitle, userEmail, (err, data) => {
    if (err) {
      res.status(404).send(err)
    } else {
      res.status(202).send(data)
    }
  })
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
