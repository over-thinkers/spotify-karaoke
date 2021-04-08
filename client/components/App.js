import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar';
import NavLoggedIn from './NavLoggedIn';
import Header from './Header';
import HeaderLoggedIn from './HeaderLoggedIn';
import Dashboard from './Dashboard'
import Login from './Login'

function App() {
  const code = new URLSearchParams(window.location.search).get('code');
 
  return (
    <>
      {code ? <NavLoggedIn /> : <NavBar />}
      {code ? <HeaderLoggedIn /> : <Header/>}
      {code ? <Dashboard code={code}/> : <Login /> }
    </>
  )
}

export default App
