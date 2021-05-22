import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const Nav = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  width: 100%;
  background-color: ${(props) =>
    props.loggedOut ? '#000' : 'rgba(0, 0, 0, 0.6)'};
  height: 50px;
  margin: 0;
  padding: 1rem 0;
  font-weight: 700;
  z-index: 1000;
`;

const NavContent = styled.div`
  width: 100%;
  max-width: 1170px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.a`
  text-decoration: none;
  display: flex;
  width: 12rem;
  align-items: center;
  justify-content: space-evenly;
  color: #fff;
`;

const LogoLoggedIn = styled.div`
  text-decoration: none;
  display: flex;
  width: 12rem;
  align-items: center;
  justify-content: space-evenly;
  color: #fff;
`;

const Name = styled.div`
  font-size: 25px;
`;

const Links = styled.ul`
  // width: 9rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
`;

const LinkItem = styled.li`
  list-style: none;
  margin: auto 17px;

  a {
    font-size: 15px;
    text-decoration: none;
    color: #fff;
    transition: 100ms ease-out;
    &:hover {
      color: ${(props) => props.theme.colors.button};
    }
  }

  p {
    font-size: 15px;
    text-decoration: none;
    color: #fff;
    transition: 100ms ease-out;
    &:hover {
      color: ${(props) => props.theme.colors.button};
      cursor: pointer;
    }
  }
`;

const Line = styled.li`
  list-style: none;
  background: #fff;
  margin: auto 17px;
  display: inline-block;
  height: 16px;
  width: 1px;
`;

function NavBar({ loggedOut, loggedIn, setCode }) {
  const AUTH_URL =
    'https://accounts.spotify.com/authorize?client_id=dca3db4a5a914cae9632a6c5ebba47f0&response_type=code&redirect_uri=http://spotioke.herokuapp.com/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';

  if (loggedOut) {
    return (
      <Nav loggedOut>
        <NavContent>
          <Logo href='/'>
            <img
              className='logoIcon'
              src='https://ez-drum-kit.s3-us-west-1.amazonaws.com/chat.png'
              width='42px'
            />
            <Name>Spoti-oke</Name>
          </Logo>
          <Links>
            {/* <LinkItem>
              <a href='#'>About</a>
            </LinkItem>
            <Line /> */}
            <LinkItem>
              <a href={AUTH_URL}>Log in</a>
            </LinkItem>
          </Links>
        </NavContent>
      </Nav>
    );
  }

  return (
    <Nav>
      <NavContent>
        <Link to={{ pathname: '/' }} style={{ textDecoration: 'none' }}>
          <LogoLoggedIn>
            <img
              className='logoIcon'
              src='https://ez-drum-kit.s3-us-west-1.amazonaws.com/chat.png'
              width='42px'
            />
            <Name>Spoti-oke</Name>
          </LogoLoggedIn>
        </Link>
        <Links>
          <LinkItem>
            <Link to={{ pathname: '/' }}>Home</Link>
          </LinkItem>
          {/* <LinkItem>
            <a href='#'>About</a>
          </LinkItem> */}
          <LinkItem>
            <Link to={{ pathname: 'playlist' }}>My Playlist</Link>
          </LinkItem>
          <Line />
          <LinkItem>
            <p onClick={() => setCode(null)}>Log out</p>
          </LinkItem>
        </Links>
      </NavContent>
    </Nav>
  );
}

export default NavBar;
