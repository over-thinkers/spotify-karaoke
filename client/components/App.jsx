import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import NavBar from './NavBar'
import NavLoggedIn from './NavLoggedIn'

function app() {
  const [loggedIn, setLoggedIn] = useState(true)
  
  return (
    <>
      {loggedIn ? <NavLoggedIn /> : <NavBar />}
    </>
  )
}

export default app
