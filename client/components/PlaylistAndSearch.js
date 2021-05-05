import React, { useState } from 'react';
import Playlist from './Playlist';
import SearchDrawer from './SearchDrawer';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import styled from '@emotion/styled';

const Container = styled.div((props) => ({
  position: 'fixed',
  top: '25%',
  left: 0,
  width: '24rem',
  boxShadow: props.open && 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  transform: props.open ? '' : 'translateX(-100%)',
  transition: '500ms ease-in',
}));

const OpenTab = styled.div`
  position: absolute;
  height: 4rem;
  width: 2rem;
  border-radius: 0 5px 5px 0;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  right: 0;
  top: 50%;
  transform: translate(100%, -50%);
  color: #fff;
  background-color: ${(props) => props.theme.colors.button};
  display: flex;
  justify-content: center;
  align-items: center;

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
  height: ${(props) => (props.viewPlaylist ? '110%' : '100%')};
  border-radius: ${(props) =>
    props.viewPlaylist ? '5px 5px 0 0' : '5px 0 0 0'};
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.viewPlaylist ? '#fff' : '#b9b9b9')};
  &:hover {
    cursor: pointer;
  }
`;

const PlaylistTabText = styled.h5`
  margin: 0;
`;

const SearchTab = styled.div`
  width: 50%;
  height: ${(props) => (props.viewPlaylist ? '100%' : '110%')};
  border-radius: ${(props) => (props.viewPlaylist ? '0 5px 0 0' : '5px 5px 0 0')};
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.viewPlaylist ? '#b9b9b9' : '#fff')};
  &:hover {
    cursor: pointer;
  }
`;

const SearchTabText = styled.h5`
  margin: 0;
`;

const PlaylistAndSearch = () => {
  const [viewPlaylist, setViewPlaylist] = useState(true);
  const [open, setOpen] = useState(true);

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
      <OpenTab onClick={handleOpen}>
        {open ? <FaChevronLeft /> : <FaChevronRight />}
      </OpenTab>
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
