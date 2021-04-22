import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const SongContext = createContext();

export const SongContextProvider = (props) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [playlistIdx, setPlaylistIdx] = useState(0);
  const [userEmail, setUserEmail] = useState('');

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
    currentSong,
    playlist,
    setPlaylist,
    setCurrentSong,
    playlistIdx,
    setPlaylistIdx,
    userEmail,
    setUserEmail,
    addToPlaylist,
    nextSong,
    prevSong,
    deleteSong,
  };

  console.log("conte4xttttttttt", context)

  return (
    <SongContext.Provider value={context}>
      {props.children}
    </SongContext.Provider>
  );
};

export default SongContext;
