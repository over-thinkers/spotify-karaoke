import React, { useState } from 'react';

function HeaderLoggedIn() {
  
  return (
    <>
      <div class="headerContainer2">
            <div class="title2">
                <h1>Sing Aloud. Be Happy</h1>
            </div>
            <div class="playlistButton2">
                <button class='button2' onClick={()=>{alert('send user to Playlist page')}}>MY PLAYLIST</button>
            </div>
      </div>
    </>
  )
}

export default HeaderLoggedIn
