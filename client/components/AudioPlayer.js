import React, { useState, useEffect, useRef, useContext } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import SongContext from '../../context/SongContext';

function AudioPlayer({ accessToken }) {
  if (!accessToken) return null;

  const [play, setPlay] = useState(false);
  const context = useContext(SongContext);

  useEffect(() => {
    if (!context.currentSong) return setPlay(false);
    setPlay(true);
  }, [context.currentSong]);

  const playerCallback = (state) => {
    if (!state.isPlaying) {
      setPlay(false);
      if (state.type === 'player_update' && state.position === 0) {
        context.nextSong();
      }
    }
  };

  return (
    <div
      style={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
      }}
    >
      <button
        onClick={context.prevSong}
        style={{
          width: '50%',
          height: '2.5rem',
        }}
      >
        prev
      </button>
      <button
        onClick={context.nextSong}
        style={{
          width: '50%',
          height: '2.5rem',
        }}
      >
        next
      </button>
      <SpotifyPlayer
        play={play}
        token={accessToken}
        showSaveIcon
        uris={context.currentSong ? [context.currentSong.uri] : []}
        callback={playerCallback}
      />
    </div>
  );
}

export default AudioPlayer;
