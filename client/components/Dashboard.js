import React, { Fragment, useState, useEffect } from 'react'
import useAuth from './useAuth'
import SpotifyWebApi from 'spotify-web-api-node';
import SearchResultTrack from './SearchResultTrack';

const spotifyApi = new SpotifyWebApi({
  clientId: 'fe60e323d09f45e7bf069353680f5a1a'
})

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [delay, setDelay] = useState();

  const searchTracks = () => {
    spotifyApi.searchTracks(search)
      .then(res => {
        setSearchResults(res.body.tracks.items.map(track => {

          const smallestImage = track.album.images.reduce((smallest, current) => {
            if (current.height < smallest.height) return current
            return smallest
          })

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestImage.url
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
      <input 
        type="search"
        placeholder="Search by song or artist"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div>
        {searchResults.map(track => (
          <SearchResultTrack track={track} key={track.uri} />
        ))}
      </div>
    </>
  )
}

export default Dashboard
