import React, { useState, useEffect, useRef, useContext } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import AppContext from '../../context/AppContext';
import styled from '@emotion/styled';
import { GrChapterPrevious, GrChapterNext } from 'react-icons/gr';
import { BiSkipNext } from 'react-icons/bi';
import { jsx, ThemeProvider, useTheme } from '@emotion/react';
import PlaylistAndSearch from './PlaylistAndSearch';
import { Next, Previous } from "../../Icons.js";


const Container = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: #f1f1f1;
  background-color: #fff;
  text-align: center;
`;

const Button = styled.button`
  height: 2.5rem;
  text-align: center;
  background: none;
  border: none;
  position: absolute;
  right: ${(props) => props.prev && '50%'};
  left: ${(props) => props.next && '50%'};
  transform: ${(props) =>
    props.prev ? 'translateX(-40px)' : 'translateX(40px)'};
  top: 15%;
  z-index: 99;
  transition: 200ms ease-out;
  &:hover {
    cursor: pointer;
    transform: ${(props) =>
      props.prev
        ? 'translateX(-40px) scale(1.05)'
        : 'translateX(40px) scale(1.05)'};
  }
  &:active {
    transform: ${(props) =>
      props.prev ? 'translateX(-40px)' : 'translateX(40px)'};
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

  const theme = useTheme();

  useEffect(() => {
    if (!playerReady) return;
    if (!context.currentSong) return setPlay(false);
    setPlay(true);
  }, [context.currentSong]);

  useEffect(() => {
    playerReady && setPlay(true);
  }, [playerReady]);

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
        <Button prev onClick={context.prevSong}>
          <Previous color="white" size={25} />
        </Button>
      )}
      {playerReady && context.playlistIdx < context.playlist.length - 1 && (
        <Button next onClick={context.nextSong}>
          <Next color="white" size={25} />
        </Button>
      )}

      <SpotifyPlayer
        play={play}
        token={accessToken}
        showSaveIcon
        uris={context.currentSong ? [context.currentSong.uri] : []}
        callback={playerCallback}
        styles={{
          activeColor: theme.colors.primary,
          zIndex: 1000,
          bgColor: 'black',
          color: '#fff',
          trackNameColor: '#fff',
          sliderTrackColor: '#fff',
          sliderHandleColor: '#fff',
          sliderColor: '#0066FF',
        }}
      />
    </Container>
  );
}

export default AudioPlayer;
