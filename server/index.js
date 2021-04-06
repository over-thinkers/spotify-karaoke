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

app.post('/login', (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: 'fe60e323d09f45e7bf069353680f5a1a',
    clientSecret: '7cca8a8c8cd84206bd7851acc4a129fe'
  })

  spotifyApi.authorizationCodeGrant(code)
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

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: 'fe60e323d09f45e7bf069353680f5a1a',
    clientSecret: '7cca8a8c8cd84206bd7851acc4a129fe',
    refreshToken
  })

  spotifyApi.refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in
      })
    })
    .catch((err) => {
      res.sendStatus(400);
    })
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

