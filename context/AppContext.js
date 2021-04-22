import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-node';
import useAuth from '../client/components/useAuth';

const AppContext = createContext();

const spotifyApi = new SpotifyWebApi({
  clientId: 'dca3db4a5a914cae9632a6c5ebba47f0',
});

export const AppContextProvider = (props) => {
  const accessToken = useAuth(props.code);

  /********** USER **********/
  const [userEmail, setUserEmail] = useState('');

  /********** SEARCH **********/
  const [search, setSearch] = useState('gryffin');
  const [searchResults, setSearchResults] = useState([]);
  const [delay, setDelay] = useState();

  /********** PLAYLIST **********/
  const [currentSong, setCurrentSong] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [playlistIdx, setPlaylistIdx] = useState(0);

  /********** USER **********/
  const userInfo = () => {
    axios
      .get(`https://api.spotify.com/v1/me?access_token=${accessToken}`)
      .then((res) => {
        setUserEmail(res.data.email);
      });
  };

  useEffect(() => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
      userInfo();

      spotifyApi.getMyDevices().then((data) => console.log(data.body.devices));
    }
  }, [accessToken]);

  useEffect(() => {
    if (!userEmail) return;

    axios
      .get('http://localhost:3000/user', {
        params: { email: userEmail },
      })
      .then((res) => {
        console.log('GOT USER', res);
        if (res.data.length) {
          setPlaylist(res.data[0].playlist);
        }
        // if it's a new user
        if (!res.data.length) {
          axios
            .post('http://localhost:3000/user', {
              email: userEmail,
            })
            .then((res) => {
              console.log('CREATED USER', res);
            })
            .catch((err) => {
              console.log('Error creating user', err);
            });
        }
      })
      .catch((err) => {
        console.log('Error getting user', err);
      });
  }, [userEmail]);

  /********** SEARCH **********/
  const searchTracks = () => {
    spotifyApi.searchTracks(search, { limit: 20, offset: 0 }).then((res) => {
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestImage = track.album.images.reduce(
            (smallest, current) => {
              if (current.height < smallest.height) return current;
              return smallest;
            }
          );

          const largestImage = track.album.images[0];

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: largestImage.url,
          };
        })
      );
    });
  };

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    if (delay) clearTimeout(delay);

    setDelay(
      setTimeout(() => {
        searchTracks();
      }, 300)
    );
  }, [search, accessToken]);

  /********** PLAYLIST **********/
  const addToPlaylist = (track) => {
    if (!currentSong) {
      setCurrentSong(playlist[playlistIdx]);
    }

    // don't allow duplicates in playlist
    const uris = playlist.map((track) => track.uri);
    if (uris.includes(track.uri)) return;

    setPlaylist((prev) => [...prev, track]);
  };

  const nextSong = () => {
    if (!playlist[playlistIdx + 1]) return;
    setPlaylistIdx((prev) => prev + 1);
  };

  const prevSong = () => {
    if (!playlist[playlistIdx - 1]) return;
    setPlaylistIdx((prev) => prev - 1);
  };

  const deleteSong = (index) => {
    setPlaylist((prev) => prev.filter((track, i) => i !== index));
    if (index < playlistIdx) {
      setPlaylistIdx((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (!playlist.length) return;
    if (currentSong.uri === playlist[playlistIdx].uri) return;
    setCurrentSong(playlist[playlistIdx]);
  }, [playlistIdx]);

  useEffect(() => {
    if (!userEmail) return;
    setCurrentSong(playlist[playlistIdx]);

    axios
      .put('http://localhost:3000/playlist', {
        email: userEmail,
        playlist,
      })
      .then((res) => {
        console.log('UPDATED PLAYLIST', res);
      })
      .catch((err) => {
        console.log('Error updating playlist', err);
      });
  }, [playlist]);

  const context = {
    accessToken,
    userEmail,
    setUserEmail,
    search,
    setSearch,
    searchResults,
    setSearchResults,
    currentSong,
    setCurrentSong,
    playlist,
    setPlaylist,
    playlistIdx,
    setPlaylistIdx,
    addToPlaylist,
    nextSong,
    prevSong,
    deleteSong,
  };

  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  );
};

export default AppContext;
