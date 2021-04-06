import React, { useState } from 'react';

function Header() {
  
  return (
    <>
        <div class="headerContainer">
            <div class="title">
                <h1>Log In. Using Spotify</h1>
            </div>
            <div class="playlistButton">
                <button class='button' onClick={()=>{alert('send user to Spotify Authentication')}}>LOG IN</button>
            </div>
      </div>
    </>
  )
}

export default Header
