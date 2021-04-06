import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import NavBar from './NavBar'
import NavLoggedIn from './NavLoggedIn'
import Header from './Header'
import HeaderLoggedIn from './HeaderLoggedIn'

function app() {
  const [loggedIn, setLoggedIn] = useState(false)
  
  return (
    <>
      {loggedIn ? <NavLoggedIn /> : <NavBar />}
      {loggedIn ? <HeaderLoggedIn /> : <Header/>}
    </>
  )
}

export default app
