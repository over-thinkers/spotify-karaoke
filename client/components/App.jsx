import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import NavBar from './NavBar'
import NavLoggedIn from './NavLoggedIn'

function app() {
  const [loggedIn, setLoggedIn] = useState(false)
  return (
    <div>
      {loggedIn ? <NavLoggedIn /> : <NavBar />}
    </div>
  )
}

export default app
