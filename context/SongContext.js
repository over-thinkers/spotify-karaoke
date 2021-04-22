import React, { createContext, useState } from 'react';

const SongContext = createContext();

export const SongContextProvider = (props) => {
  const [currentSong, setCurrentSong] = useState();

  const context = {
    currentSong,
    setCurrentSong
  };

  console.log("conte4xttttttttt", context)

  return (
    <SongContext.Provider value={context}>
      {props.children}
    </SongContext.Provider>
  )
}

export default SongContext;