import React from 'react';
import { Link } from 'react-router-dom';


const SearchResultTrack = ({ track, userEmail }) => {
  const { artist, title, uri, albumUrl } = track;
  {console.log("album urllllllll", albumUrl)}
  return (
    <div className="songInfo">
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
