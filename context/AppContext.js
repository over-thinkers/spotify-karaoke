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
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [delay, setDelay] = useState();
  const [searchLimit, setSearchLimit] = useState(10);
  const [searchOffset, setSearchOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

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
        if (res.data.length) {
          setPlaylist(res.data[0].playlist);
        } else {
          // if it's a new user
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
    spotifyApi
      .searchTracks(search, { limit: searchLimit, offset: searchOffset })
      .then((res) => {
        if (!res.body.tracks.items.length) return setHasMore(false);
        const results = res.body.tracks.items.map((track) => {
          const largestImage = track.album.images[0];

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: largestImage.url,
            length: track.duration_ms,
          };
        });

        setSearchResults((prev) => [...prev, ...results]);
      });
  };

  const nextPage = () => {
    setSearchOffset((prev) => prev + searchLimit);
  };

  useEffect(() => {
    if (!accessToken) return;
    if (!search) return;
    if (searchOffset === 0) return;

    searchTracks();
  }, [searchOffset]);

  useEffect(() => {
    if (!search) {
      setSearchResults([]);
      setHasMore(true);
      return;
    }
    if (!accessToken) return;

    if (delay) clearTimeout(delay);
    setHasMore(true);
    setSearchOffset(0);
    setSearchResults([]);

    setDelay(
      setTimeout(() => {
        searchTracks();
      }, 500)
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
    const playlistLastIdx = playlist.length - 1;
    setPlaylist((prev) => prev.filter((track, i) => i !== index));
    if (index < playlistIdx) {
      setPlaylistIdx((prev) => prev - 1);
    } else if (index === playlistIdx && index === playlistLastIdx) {
      setPlaylistIdx(0);
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
    nextPage,
    hasMore,
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
