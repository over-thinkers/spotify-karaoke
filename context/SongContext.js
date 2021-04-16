import React, { createContext, useState, useEffect } from 'react';

const SongContext = createContext();

export const SongContextProvider = (props) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [playlistIdx, setPlaylistIdx] = useState(0);

  const addToPlaylist = (track) => {
    if (!currentSong) {
      setCurrentSong(track);
    } 
    setPlaylist(prev => [...prev, track]);
  }

  const nextSong = () => {
    if (!playlist[playlistIdx + 1]) return;
    setPlaylistIdx(prev => prev + 1);
  }
  
  const prevSong = () => {
    if (!playlist[playlistIdx - 1]) return;
    setPlaylistIdx(prev => prev - 1);
  }

  const deleteSong = (index) => {
    setPlaylist(prev => (
      prev.filter((track, i) => (
        i !== index
      ))
    ))
    if (index < playlistIdx) {
      setPlaylistIdx(prev => prev - 1);
    }
  }
  
  useEffect(() => {
    if (!playlist.length) return;
    if (currentSong.uri === playlist[playlistIdx].uri) return;
    setCurrentSong(playlist[playlistIdx]);
  }, [playlistIdx])
  
  const context = {
    currentSong,
    playlist,
    setCurrentSong,
    setPlaylistIdx,
    addToPlaylist,
    nextSong,
    prevSong,
    deleteSong
  };

  return (
    <SongContext.Provider value={context}>
      {props.children}
    </SongContext.Provider>
  )
}

export default SongContext;
