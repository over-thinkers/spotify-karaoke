import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function HeaderLoggedIn() {
  return (
    <div className='headerContainer2'>
      <div className='title2'>
        <h1>Sing Aloud. Be Happy</h1>
      </div>
      <div className='playlistButton2'>
        <Link to='/playlist'>
          <button className='button2'>MY PLAYLIST</button>
        </Link>
      </div>
    </div>
  );
}

export default HeaderLoggedIn;
