import React, { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import SearchDrawerItem from './SearchDrawerItem';
import styled from '@emotion/styled';

const ListContainer = styled.div((props) => ({
  backgroundColor: '#f1f1f1',
  borderRadius: '10px 0 0 10px',
  margin: 0,
  width: '20rem',
  boxShadow: props.open ? 'rgba(0, 0, 0, 0.35) 0px 5px 15px' : 'none',
  color: '#000',
  position: 'fixed',
  top: '15%',
  right: 0,
  transition: '500ms ease-in',
  transform: props.open ? '' : 'translateX(100%)',
  zIndex: 1000,
}));

const Header = styled.h3`
  width: 100%;
  background-color: #2941ab;
  text-align: center;
  margin: 0;
  border-radius: 10px 0 0 0;
  padding: 0.5rem 0;
  color: #fff;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.5rem;
`;

const Input = styled.input`
  font-size: 1rem;
  text-align: center;
  border-radius: 7px;
  border: 1px solid black;
  padding: 0.3rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0.1rem 0.5rem;
  margin: 0;
  height: 24.5rem;
  overflow-y: scroll;
`;

const OpenSearchTab = styled.div`
  position: absolute;
  top: 46%;
  left: -51px;
  transform: rotate(-90deg);
  background-color: #2941ab;
  color: #fff;
  z-index: -1;
  border-radius: 5px 5px 0 0;
  padding: 0.3rem;
  &:hover {
    cursor: pointer;
  }
`;

const SearchDrawer = () => {
  const context = useContext(AppContext);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleOpenSearch = () => {
    setSearchOpen((prev) => !prev);
  };

  return (
    <ListContainer open={searchOpen}>
      <Header>Search</Header>
      <InputContainer>
        <Input
          type='search'
          placeholder='song title or artist'
          value={context.search}
          onChange={(e) => context.setSearch(e.target.value)}
        />
      </InputContainer>
      <List>
        <li>
          {context.searchResults.map((track) => (
            <SearchDrawerItem track={track} key={track.uri} />
          ))}
        </li>
      </List>
      <OpenSearchTab onClick={toggleOpenSearch}>SEARCH</OpenSearchTab>
    </ListContainer>
  );
};

export default SearchDrawer;
