import React, { useEffect, useRef, useContext } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'
import SongContext from '../../context/SongContext'

function AudioPlayer({ accessToken }) {
  const context = useContext(SongContext);
  if (!accessToken) return null;

  const playerRef = useRef();

  return (
    <SpotifyPlayer
      ref={playerRef}
      token={accessToken}
      showSaveIcon
      uris={[context.currentSong]}
      callback={state => {
        console.log('hello', state);
      }}
    />
  )
}

export default AudioPlayer
