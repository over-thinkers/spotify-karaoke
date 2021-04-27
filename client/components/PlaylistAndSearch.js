import React, { useState } from 'react';
import Playlist from './Playlist';
import SearchDrawer from './SearchDrawer';
import styled from '@emotion/styled';

const Container = styled.div((props) => ({
  position: 'absolute',
  bottom: '52px',
  left: '1rem',
  width: '27rem',
  zIndex: -1,
  transform: props.open ? '' : 'translateY(30rem)',
  transition: '500ms ease-in',
}));

const Header = styled.h3`
  width: 100%;
  background-color: ${(props) => props.theme.colors.primary};
  text-align: center;
  margin: 0;
  border-radius: 10px 10px 0 0;
  padding: 0.5rem 0;
  color: #fff;

  &:hover {
    cursor: pointer;
  }
`;

const List = styled.div`
  height: 28rem;
`;

const Tabs = styled.div`
  display: flex;
  height: 2rem;
  align-items: center;
`;

const PlaylistTab = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.viewPlaylist ? 'red' : 'pink')};
  &:hover {
    cursor: pointer;
  }
`;

const PlaylistTabText = styled.h5`
  margin: 0;
`;

const SearchTab = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.viewPlaylist ? 'pink' : 'red')};
  &:hover {
    cursor: pointer;
  }
`;

const SearchTabText = styled.h5`
  margin: 0;
`;

const PlaylistAndSearch = () => {
  const [viewPlaylist, setViewPlaylist] = useState(true);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const showPlaylist = () => {
    setViewPlaylist(true);
  };

  const showSearch = () => {
    setViewPlaylist(false);
  };

  return (
    <Container open={open}>
      <Header onClick={handleOpen}>^</Header>
      <Tabs>
        <PlaylistTab onClick={showPlaylist} viewPlaylist={viewPlaylist}>
          <PlaylistTabText>Playlist</PlaylistTabText>
        </PlaylistTab>
        <SearchTab onClick={showSearch} viewPlaylist={viewPlaylist}>
          <SearchTabText>Search</SearchTabText>
        </SearchTab>
      </Tabs>
      <List>
        <Playlist viewPlaylist={viewPlaylist} />
        <SearchDrawer viewPlaylist={viewPlaylist} />
      </List>
    </Container>
  );
};

export default PlaylistAndSearch;
