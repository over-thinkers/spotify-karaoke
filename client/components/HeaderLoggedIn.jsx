import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  height: 600px;
  background-color: #f2b858;
  color: #fff;
`;

const Title = styled.h1`
  font-size: 5rem;
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: -30px;
`;

const Button = styled.button`
  border: none;
  border-radius: 50px;
  height: 50px;
  width: 250px;
  background-color: #31b954;
  color: #fff;
  font-size: 17px;
  font-weight: 500;
  transition: 300ms ease-out;
  &:hover {
    cursor: pointer;
    background-color: #1ed760;
  }
  &:active {
    background-color: #31b954;
  }
`;

function HeaderLoggedIn() {
  return (
    <Container>
      <Title>Sing Aloud. Be Happy</Title>
      <ButtonContainer>
        <Link to='/playlist'>
          <Button>MY PLAYLIST</Button>
        </Link>
      </ButtonContainer>
    </Container>
  );
}

export default HeaderLoggedIn;
