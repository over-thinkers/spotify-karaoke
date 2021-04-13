import React, { useEffect, useRef } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

function AudioPlayer({ accessToken, tracks }) {
  if (!accessToken) return null;

  const playerRef = useRef();

  console.log('ref', playerRef)

  playerRef.current.props.uris.push()


  return (
    <SpotifyPlayer
      ref={playerRef}
      token={accessToken}
      showSaveIcon
      uris={tracks}
      callback={state => {
        console.log('hello', state);
      }}
    />
  )
}

export default AudioPlayer
