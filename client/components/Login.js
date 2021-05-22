import React from 'react';
import styled from '@emotion/styled';

const AUTH_URL =
  'https://accounts.spotify.com/authorize?client_id=dca3db4a5a914cae9632a6c5ebba47f0&response_type=code&redirect_uri=https://spotioke.herokuapp.com&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-modify-public%20playlist-read-private';

const Anchor = styled.a`
  text-align: center;
  margin-top: -30px;
`;

const LoginButton = styled.button`
  border: none;
  border-radius: 50px;
  height: 50px;
  width: 250px;
  background-color: ${(props) => props.theme.colors.button};
  color: #fff;
  font-size: 17px;
  font-weight: 500;
  text-decoration: none;
  transition: 300ms ease-out;
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.buttonHover};
  }
  &:active {
    background-color: ${(props) => props.theme.colors.button};
  }
`;

export default function Login() {
  return (
    <Anchor href={AUTH_URL}>
      <LoginButton>LOGIN</LoginButton>
    </Anchor>
  );
}
