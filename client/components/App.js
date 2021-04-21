import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch, useLocation, withRouter } from 'react-router-dom';
import NavBar from './NavBar';
import NavLoggedIn from './NavLoggedIn';
import Header from './Header';
import HeaderLoggedIn from './HeaderLoggedIn';
import Dashboard from './Dashboard'
import Lyrics from './Lyrics'
import Playlist from './Playlist'
import { AppContextProvider } from '../../context/AppContext';

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
    <AppContextProvider code={code}>
      <Router>
        <ScrollToTop>
          <Switch>
            <Route path="/" exact>
              {code ? <NavLoggedIn /> : <NavBar />}
              {code ? <HeaderLoggedIn /> : <Header/>}
              {code ? <Dashboard code={code}/> : null }
            </Route>

            <Route path="/playlist" exact>
              <Lyrics />
              <Playlist />
              <Dashboard code={code} />
              <NavLoggedIn />
            </Route>

          </Switch>
        </ScrollToTop>
      </Router>
    </AppContextProvider>
  )
}

export default App
