import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SongContext from '../../context/SongContext';

const SearchResultTrack = ({ track, userEmail }) => {
  const context = useContext(SongContext);

  const { artist, title, uri, albumUrl } = track;
  return (
    <div className="songInfo" onClick={() => context.setCurrentSong([uri])}>
      <Link to={{ pathname: '/playlist', state: { artist, title, albumUrl, userEmail } }}>
        <div className="songCover">
          <img src={albumUrl} className="albumCover"/>
        </div>
      </Link>
        <div className='songTitle'>{title}</div>
        <div className='songArtist'>{artist}</div>
    </div>
  )
}

export default SearchResultTrack
