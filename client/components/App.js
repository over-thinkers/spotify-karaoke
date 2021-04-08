import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import NavLoggedIn from './NavLoggedIn';
import Header from './Header';
import HeaderLoggedIn from './HeaderLoggedIn';

function App() {
  const code = new URLSearchParams(window.location.search).get('code');

  return (
    <>
      {code ? <NavLoggedIn /> : <NavBar />}
      {code ? <HeaderLoggedIn /> : <Header/>}
    </>
  )
}

export default App
