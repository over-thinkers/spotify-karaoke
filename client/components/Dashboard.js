import React, { Fragment, useState, useEffect } from 'react'
// import { useLocation} from "react-router";
import useAuth from './useAuth'
import SpotifyWebApi from 'spotify-web-api-node';
import SearchResultTrack from './SearchResultTrack';

const spotifyApi = new SpotifyWebApi({
  clientId: 'dca3db4a5a914cae9632a6c5ebba47f0'
})

const Dashboard = ({ code }) => {
  // let location = useLocation();
  // console.log(location.state)
  const accessToken = useAuth(code);
  const [search, setSearch] = useState('gryffin');
  const [searchResults, setSearchResults] = useState([]);
  const [delay, setDelay] = useState();

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

  useEffect(() => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
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
          <SearchResultTrack track={track} key={track.uri} />
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default Dashboard
