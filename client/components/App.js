import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch, useLocation, withRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import NavBar from './NavBar';
import NavLoggedIn from './NavLoggedIn';
import Header from './Header';
import HeaderLoggedIn from './HeaderLoggedIn';
import Dashboard from './Dashboard'
import Login from './Login'
import Playlist from './Playlist'

function _ScrollToTop(props) {
  const { pathname } = useLocation();
  useEffect(() => {
      window.scrollTo(0, 0);
  }, [pathname]);
  return props.children
}
const ScrollToTop = withRouter(_ScrollToTop)

function App() {
  const code = new URLSearchParams(window.location.search).get('code');
 
  return (
    <>
    <Router>
      <ScrollToTop>
        <Switch>
          <Route path="/" exact>
            {code ? <NavLoggedIn /> : <NavBar />}
            {code ? <HeaderLoggedIn /> : <Header/>}
            {code ? <Dashboard code={code}/> : null }
          </Route>

          <Route path="/playlist" exact>
            <NavLoggedIn />
            <Playlist />
            <Dashboard code={code} />
          </Route>

        </Switch>
      </ScrollToTop>
    </Router>
    </>
  )
}

export default App
