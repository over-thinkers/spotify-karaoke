import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';
import PlaylistItem from './PlaylistItem';
import SongContext from '../../context/SongContext';

function Playlist() {
  const context = useContext(SongContext);
  const playlist = context.playlist;

  return (
    <div className='playlistContainer'>
      <div className='playlistHeader'>
        <h1 className='playlistH1'>My Playlist</h1>
      </div>
      <div className='playlistBox'>
        {playlist.map((song, index) => {
          return (
            <PlaylistItem
              song={song}
              key={song.uri}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Playlist;
