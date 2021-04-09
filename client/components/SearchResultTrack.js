import React from 'react';
import { Link } from 'react-router-dom';


const SearchResultTrack = ({ track }) => {
  const { artist, title, uri, albumUrl } = track;
  return (
    <div className="songInfo">
      <Link to={{ pathname: '/playlist', state: { artist, title, albumUrl } }}>
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
