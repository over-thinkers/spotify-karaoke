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
  background-color: ${(props) => props.theme.colors.lyricsBg};
  color: ${(props) => props.theme.colors.lyricsText};
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

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    window.scrollTo(0, 0);
    setLyrics('');

    axios
      .get('http://localhost:3000/lyrics', {
        cancelToken: source.token,
        params: {
          track: context.currentSong.title,
          artist: context.currentSong.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Request cancelled!');
        }
      });

    return () => source.cancel();
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


      <div class="mouse_scroll">

        <div class="mouse">
          <div class="wheel"></div>
        </div>
        <div>
          <span class="m_scroll_arrows unu"></span>
          <span class="m_scroll_arrows doi"></span>
          <span class="m_scroll_arrows trei"></span>
        </div>
      </div>
    </LyricsContainer>
  );
}

export default Lyrics;
