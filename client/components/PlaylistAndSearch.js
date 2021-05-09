import React, { useState } from 'react';
import Playlist from './Playlist';
import SearchDrawer from './SearchDrawer';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { HiOutlineMusicNote } from "react-icons/hi";
import styled from '@emotion/styled';


const Container = styled.div((props) => ({
  position: 'fixed',
  top: '0%',
  left: 0,
  height: '100vh',
  backgroundColor: "#000000",
  width: '24rem',
  boxShadow: props.open && 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  transform: props.open ? '' : 'translateX(-100%)',
  transition: '500ms ease-in',
  zIndex: '0',
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
  background-color: ${(props) => props.theme.colors.switch};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 300ms ease-out;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.switchHover};
  }
`;

const List = styled.div`
  height: 28rem;
`;

const NavList = styled.div`

`;


const Tabs = styled.div`
  height: 34rem;
  width: 20%;
  margin-bottom: 50px;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 15%;
  color: #fff;
  padding-top: 60%;
`;

const PlaylistTab = styled.div`
  margin-bottom: 50px;
  display: flex;
  &:hover {
    cursor: pointer;
  };

`;

const PlaylistTabText = styled.h5`
  margin: 0;
  margin-left: 20px;
`;

const SearchTab = styled.div`
  display: flex;
  margin-bottom: 50px;
  &:hover {
    cursor: pointer;
  };
`;

const SearchTabText = styled.h5`
  margin: 0;
  margin-left: 20px;
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
        <PlaylistTab>
          <NavList>
            <AiOutlineHome />
          </NavList>
          <PlaylistTabText>
            Home
          </PlaylistTabText>
        </PlaylistTab>

        <SearchTab onClick={showSearch} viewPlaylist={viewPlaylist}>

          <NavList>
            <AiOutlineSearch />
          </NavList>
          <SearchTabText>
            Search
          </SearchTabText>
        </SearchTab>
        <PlaylistTab onClick={showPlaylist} viewPlaylist={viewPlaylist}>

          <NavList>
            <HiOutlineMusicNote />
          </NavList>
          <PlaylistTabText>
            Playlist
          </PlaylistTabText>
        </PlaylistTab>
      </Tabs>
      <List>
        <Playlist viewPlaylist={viewPlaylist} />
        <SearchDrawer viewPlaylist={viewPlaylist} />
      </List>
    </Container>
  );
};

export default PlaylistAndSearch;

/* SEARCH TAB
 /* width: 50%;
  height: ${(props) => (props.viewPlaylist ? '100%' : '110%')};
  border-radius: ${(props) =>
    props.viewPlaylist ? '0 5px 0 0' : '5px 5px 0 0'};
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.viewPlaylist ? '#b9b9b9' : '#fff')};
  /* &:hover {
    cursor: pointer;
  }; */

  /* PLAYLIST TAB
  /* width: 50%;
  height: ${(props) => (props.viewPlaylist ? '110%' : '100%')};
  border-radius: ${(props) =>
    props.viewPlaylist ? '5px 5px 0 0' : '5px 0 0 0'};
  font-size: 1.3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: ${(props) => (props.viewPlaylist ? '#fff' : '#b9b9b9')}; */
  /* &:hover {
    cursor: pointer;
  }; */
