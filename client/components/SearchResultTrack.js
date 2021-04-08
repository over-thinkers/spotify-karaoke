import React from 'react'

const SearchResultTrack = ({ track }) => {
  const { artist, title, uri, albumUrl } = track;
  return (
    <div>
      <img src={albumUrl} />
      {console.log('the tracks', uri)}
      <div>
        <div>{title}</div>
        <div>{artist}</div>
      </div>
    </div>
  )
}

export default SearchResultTrack
