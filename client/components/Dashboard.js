import React, { Fragment, useState, useEffect, useRef } from 'react'
import useAuth from './useAuth'
import SpotifyWebApi from 'spotify-web-api-node';
import SearchResultTrack from './SearchResultTrack';
import AudioPlayer from './AudioPlayer';
import SpotifyPlayer from 'react-spotify-web-playback';
import axios from 'axios'

const spotifyApi = new SpotifyWebApi({
  clientId: 'dca3db4a5a914cae9632a6c5ebba47f0'
})

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState('gryffin');
  const [searchResults, setSearchResults] = useState([]);
  const [delay, setDelay] = useState();
  let [userEmail, setUserEmail] = useState('')

  const searchTracks = () => {
    spotifyApi.searchTracks(search)
      .then(res => {
        setSearchResults(res.body.tracks.items.slice(0, 6).map(track => {
          const smallestImage = track.album.images.reduce((smallest, current) => {
            if (current.height < smallest.height) return current
            return smallest
          })

          const largestImage = track.album.images[0]

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: largestImage.url
          }
        }))
      })
  }

  const userInfo = () => {
    axios.get(`https://api.spotify.com/v1/me?access_token=${accessToken}`)
      .then((res) => {
        setUserEmail(userEmail = res.data.email)
        console.log('user data:', res.data)
      })
      .then(() => console.log("userrrrr", userEmail))
  }

  useEffect(() => {
    userInfo();
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);

      // spotifyApi.getMe()
      // .then(data => {
      //   console.log(data)
      //   spotifyApi.getUserPlaylists(data.body.id)
      //     .then(res => {
      //       spotifyApi.getPlaylist("4FXYlr757L1wMERZGOrOrE")
      //         .then(list => console.log(list))
      //     })
      // })
      // .catch(err => {
      //   console.log(err)
      // })

      spotifyApi.getMyDevices()
        .then(data => console.log(data.body.devices))
    }
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    if (delay) clearTimeout(delay);

    setDelay(setTimeout(() => {
      searchTracks();
    }, 300))

  }, [search, accessToken])

  return (
    <>
      <div className="songContainer">
        <div className="title">
          <h1>Looking for music?</h1>
        </div>
        <div className="subtitle">
          <p>Start listening to the best new releases</p>
        </div>
        <div className="songSearch">
        <input
          className="songSearch"
          type="search"
          placeholder="Search by song or artist"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        </div>
        <div className="songList">
          {searchResults.map(track => (
            <div className="mappedItems">
              <SearchResultTrack userEmail={userEmail} track={track} key={track.uri} />
            </div>
          ))}
        </div>
        <AudioPlayer accessToken={accessToken} />
      </div>
    </>
  )
}

export default Dashboard
