import React, { useState, useEffect, useRef, useContext } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import AppContext from '../../context/AppContext';
import styled from '@emotion/styled';
import { GrChapterPrevious, GrChapterNext } from 'react-icons/gr';

const Container = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: #f1f1f1;
  background-color: #fff;
  text-align: center;
`;

const Next = styled.button`
  width: 5%;
  height: 2.5rem;
  text-align: center;
  background-color: #fff;
  border: none;
  position: absolute;
  left: 52%;
  top: 15%;
  z-index: 99;
  /* border: 1px solid black; */
  transition: 500ms ease-out;
  &:hover {
    cursor: pointer;
    background-color: #e0dfdf;
  }
  &:focus {
    outline: none;
  }

  @media (min-width: 300px) and (max-width: 1024px) {
    top: 55%;
  }
`;

const Prev = styled.button`
  width: 5%;
  height: 2.5rem;
  text-align: center;
  background-color: #fff;
  border: none;
  position: absolute;
  left: 43%;
  top: 15%;
  z-index: 99;
  transition: 500ms ease-out;
  &:hover {
    cursor: pointer;
    background-color: #e0dfdf;
  }
  &:focus {
    outline: none;
  }

  @media (min-width: 300px) and (max-width: 1024px) {
    /* display: none; */
    top: 55%;
  }
`;

function AudioPlayer() {
  const context = useContext(AppContext);
  const [play, setPlay] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const accessToken = context.accessToken;

  useEffect(() => {
    if (!context.currentSong) return setPlay(false);
    setPlay(true);
  }, [context.currentSong]);

  if (!accessToken) return null;

  const playerCallback = (state) => {
    if (!playerReady && state.status === 'READY') {
      setPlayerReady(true);
    }
    if (!state.isPlaying) {
      setPlay(false);
      if (state.type === 'player_update' && state.position === 0) {
        context.nextSong();
      }
    }
  };

  return (
    <Container>
      {playerReady && context.playlistIdx > 0 && (
        <Prev classname='prev-button' onClick={context.prevSong}>
          <GrChapterPrevious size={25} />
        </Prev>
      )}
      {playerReady && context.playlistIdx < context.playlist.length - 1 && (
        <Next classname='next-button' onClick={context.nextSong}>
          <GrChapterNext size={25} />
        </Next>
      )}

      <SpotifyPlayer
        play={play}
        token={accessToken}
        showSaveIcon
        uris={context.currentSong ? [context.currentSong.uri] : []}
        callback={playerCallback}
        styles={{
          sliderColor: '#2941ab',
          activeColor: '#2941ab',
        }}
      />
    </Container>
  );
}

export default AudioPlayer;
