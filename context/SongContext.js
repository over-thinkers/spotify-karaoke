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
  
  useEffect(() => {
    if (!playlist.length) return;
    setCurrentSong(playlist[playlistIdx]);
  }, [playlistIdx])
  
  const context = {
    currentSong,
    setCurrentSong,
    addToPlaylist,
    nextSong,
    prevSong
  };

  return (
    <SongContext.Provider value={context}>
      {props.children}
    </SongContext.Provider>
  )
}

export default SongContext;
