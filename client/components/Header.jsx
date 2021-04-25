import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #2941ab;
  color: #fff;
`;

const Title = styled.h1`
  font-size: 5rem;
`;

function Header() {
  return (
    <Container>
      <Title>Log In. Using Spotify</Title>
      <Login />
    </Container>
  );
}

export default Header;
