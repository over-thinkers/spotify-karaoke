import React from 'react';

function PlaylistItems({ songs }) {
  return (
    <>
        <div>
            {songs.artist}
            {songs.title}
            <img src={songs.albumUrl}/>
        </div>
    </>
  )
}

export default PlaylistItems
