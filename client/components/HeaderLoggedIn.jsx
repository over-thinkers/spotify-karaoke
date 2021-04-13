import React, { useState } from 'react';

function HeaderLoggedIn() {

  return (
    <>
      <div className="headerContainer2">
            <div className="title2">
                <h1>Sing Aloud. Be Happy</h1>
            </div>
            <div className="playlistButton2">
                <button className='button2' onClick={()=>{alert('send user to Playlist page')}}>MY PLAYLIST</button>
            </div>
      </div>
    </>
  )
}

export default HeaderLoggedIn
