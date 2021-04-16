import axios from 'axios';
import React, { useContext } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import SongContext from '../../context/SongContext';

function PlaylistItem({ song, index }) {
  const context = useContext(SongContext);

  const selectPlaylistTrack = (i) => {
    context.setPlaylistIdx(i);
  };

  const showDelete = () => {
    console.log(index, context.playlistIdx)
    return index !== context.playlistIdx;
  };

  return (
    <div className='playlistSongList'>
      <div className='playlistTitle'>
        {showDelete() && (
          <p
            className='deleteIcon'
            onClick={() => {
              context.deleteSong(index);
            }}
          >
            <AiOutlineDelete size={12} />
          </p>
        )}
      </div>
      <div className='playlistTitle'>
        <p
          className='playSong songTitle'
          onClick={() => {
            selectPlaylistTrack(index);
          }}
        >
          {`${song.title}`}
        </p>
      </div>

      <div className='playlistAritst'>
        <p
          className='playSong'
          onClick={() => alert('make song play when clicked')}
        >{`  by ${song.artist} `}</p>
      </div>

      <div className='playlistAlubum'>
        <img
          className='playlistImg playSong'
          src={song.albumUrl}
          onClick={() => alert('make song play when clicked')}
        />
      </div>
    </div>
  );
}

export default PlaylistItem;
