import React, { useState, useEffect, useRef } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useLocation,
  withRouter,
} from 'react-router-dom';
import NavBar from './NavBar';
import NavLoggedIn from './NavLoggedIn';
import Header from './Header';
import HeaderLoggedIn from './HeaderLoggedIn';
import Dashboard from './Dashboard';
import Lyrics from './Lyrics';
import Playlist from './Playlist';
import { AppContextProvider } from '../../context/AppContext';
import SearchDrawer from './SearchDrawer';
import AudioPlayer from './AudioPlayer';
import { jsx, ThemeProvider } from '@emotion/react';

const theme = {
  colors: {
    primary: '#2941ab',
    secondary: '#347FC4',
    button: '#31b954',
  },
};

function _ScrollToTop(props) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return props.children;
}
const ScrollToTop = withRouter(_ScrollToTop);

function App() {
  const [code, setCode] = useState();

  const dashboardRef = useRef();

  useEffect(() => {
    setCode(new URLSearchParams(window.location.search).get('code'));
  }, []);

  return (
    <AppContextProvider code={code}>
      <ThemeProvider theme={theme}>
        <Router>
          <ScrollToTop>
            <Switch>
              <Route path='/' exact>
                {code ? <NavLoggedIn /> : <NavBar />}
                {code ? (
                  <HeaderLoggedIn dashboardRef={dashboardRef} />
                ) : (
                  <Header />
                )}
                {code ? (
                  <Dashboard dashboardRef={dashboardRef} code={code} />
                ) : null}
              </Route>

              <Route path='/playlist' exact>
                <Lyrics />
                {/* <Playlist />
                <SearchDrawer /> */}
                <NavLoggedIn />
              </Route>
            </Switch>
          </ScrollToTop>
        </Router>
        {code && <AudioPlayer />}
      </ThemeProvider>
    </AppContextProvider>
  );
}

export default App;
