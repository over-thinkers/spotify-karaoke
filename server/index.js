require('dotenv').config();
const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

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
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in
      })
    })
    .catch(err => {
      res.sendStatus(400)
    })

})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
  