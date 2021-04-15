import React, { createContext, useState } from 'react';

const SongContext = createContext();

export const SongContextProvider = (props) => {
  const [currentSong, setCurrentSong] = useState([]);

  const context = {
    currentSong,
    setCurrentSong
  };

  return (
    <SongContext.Provider value={context}>
      {props.children}
    </SongContext.Provider>
  )
}

export default SongContext;
