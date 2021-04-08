import React from 'react'

const SearchResultTrack = ({ track }) => {
  const { artist, title, uri, albumUrl } = track;
  return (
    <div className="songInfo">
      <div className="songCover">
      <img src={albumUrl} className="albumCover"/>
      </div>
      {/* <div> */}
        <div className='songTitle'>{title}</div>
        <div className='songArtist'>{artist}</div>
      {/* </div> */}
    </div>
  )
}

export default SearchResultTrack
