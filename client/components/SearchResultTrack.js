import React from 'react'

const SearchResultTrack = ({ track, selectTrack }) => {
  const { artist, title, uri, albumUrl } = track;
  return (
    <div onClick={() => selectTrack(uri)} >
      <img src={albumUrl} />
      <div>
        <div>{title}</div>
        <div>{artist}</div>
      </div>
    </div>
  )
}

export default SearchResultTrack
