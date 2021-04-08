import React, { useEffect } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

function AudioPlayer({ accessToken, tracks }) {
  if (!accessToken) return null;

  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      uris={tracks}
      callback={state => {
        console.log(state);
      }}
    />
  )
}

export default AudioPlayer
