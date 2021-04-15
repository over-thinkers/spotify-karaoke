import React, { useEffect, useRef, useContext } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'
import SongContext from '../../context/SongContext'

function AudioPlayer({ accessToken }) {
  if (!accessToken) return null;
  const context = useContext(SongContext);

  return (
    <div 
      className="playerContainer" 
      style={{
        width: '100%',
        position: 'fixed',
        bottom: 0
      }}
    >
      <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        uris={context.currentSong}
        callback={state => {
          console.log('Player state changed: ', state);
          if (state.type === 'player_update' && state.position === 0) {
            console.log('Load the next song now')
          }
        }}
      />
    </div>
  )
}

export default AudioPlayer
