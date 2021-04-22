import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';
import AppContext from '../../context/AppContext';
import styled from '@emotion/styled';

const LyricsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 82px 0 150px 0;
  background-color: #f2b858;
  color: #000;
  min-height: 100vh;
  width: 100%;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
`;

const SongLyrics = styled.p`
  text-align: center;
  line-height: 1.6;
  white-space: pre;
  font-size: 1.2rem;
`;

function Lyrics() {
  const context = useContext(AppContext);
  const [lyrics, setLyrics] = useState('');

  useEffect(() => {
    if (!context.currentSong) return;
    setLyrics('');

    axios
      .get('http://localhost:3000/lyrics', {
        params: {
          track: context.currentSong.title,
          artist: context.currentSong.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [context.currentSong]);

  if (!lyrics) {
    return (
      <LyricsContainer>
        <h4>Loading...</h4>
      </LyricsContainer>
    );
  }

  if (!context.currentSong) return null;

  return (
    <LyricsContainer>
      <Title>
        {context.currentSong.title}
        <br />
        by {context.currentSong.artist}
      </Title>
      <SongLyrics>{lyrics}</SongLyrics>
    </LyricsContainer>
  );
}

export default Lyrics;
