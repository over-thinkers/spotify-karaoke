import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';
import SongContext from '../../context/SongContext';

function Lyrics() {
  const context = useContext(SongContext);
  const [lyrics, setLyrics] = useState('');

  useEffect(() => {
    if (!context.currentSong) return;

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

  return (
    <div className='lyricContainer'>
      <div className='lyricTitle'>
        <h1>{context.currentSong.title} by</h1>
      </div>
      <div className='lyricArtist'>
        <h1>{context.currentSong.artist}</h1>
      </div>
      <div className='lyricLyrics'>
        <p>{lyrics}</p>
      </div>
    </div>
  );
}

export default Lyrics;
