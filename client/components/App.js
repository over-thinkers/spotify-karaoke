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

  if (!code) {
    return (
      <ThemeProvider theme={theme}>
        <NavBar />
        <Header />
      </ThemeProvider>
    );
  }

  return (
    <AppContextProvider code={code}>
      <ThemeProvider theme={theme}>
        <Router>
          <ScrollToTop>
            <Switch>
              <Route path='/' exact>
                <NavLoggedIn />
                <HeaderLoggedIn dashboardRef={dashboardRef} />
                <Dashboard dashboardRef={dashboardRef} code={code} />
              </Route>

              <Route path='/playlist' exact>
                <NavLoggedIn />
                <Lyrics />
                {/* <Playlist />
                <SearchDrawer /> */}
              </Route>
            </Switch>
          </ScrollToTop>
        </Router>
        <AudioPlayer />
      </ThemeProvider>
    </AppContextProvider>
  );
}

export default App;
