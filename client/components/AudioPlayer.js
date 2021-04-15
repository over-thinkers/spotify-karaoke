import React, { useState, useEffect, useRef, useContext } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'
import SongContext from '../../context/SongContext'

function AudioPlayer({ accessToken }) {
  if (!accessToken) return null;

  const [play, setPlay] = useState(false);
  const context = useContext(SongContext);

  useEffect(() => {
    setPlay(true);
  }, [context.currentSong])

  return (
    <div 
      style={{
        width: '100%',
        position: 'fixed',
        bottom: 0
      }}
    >
      <SpotifyPlayer
        play={play}
        token={accessToken}
        showSaveIcon
        uris={context.currentSong}
        callback={state => {
          if (!state.isPlaying) setPlay(false)
        }}
      />
    </div>
  )
}

export default AudioPlayer
