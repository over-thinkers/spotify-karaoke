import React from 'react';

function PlaylistItems({ songs }) {
  return (
    <>
        <div className="playlistSongList">

          <div className="playlistTitle">
            {`- ${songs.title} by ` }
          </div>

          <div className="playlistAritst">
            {` ${songs.artist} `}
          </div>

          <div className="playlistAlubum">
            <img className="playlistImg" src={songs.albumUrl}/>
          </div>
        </div>
    </>
  )
}

export default PlaylistItems
