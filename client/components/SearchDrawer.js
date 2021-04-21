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
  top: '25%',
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

const List = styled.ul`
  list-style: none;
  padding: 0.1rem 0.5rem;
  margin: 0;
  min-height: 5rem;
  max-height: 17rem;
  overflow-y: scroll;
`;

const OpenSearchTab = styled.div`
  position: absolute;
  top: 46%;
  left: -52px;
  transform: rotate(-90deg);
  background-color: #fff;
  z-index: -1;
  border-radius: 5px 5px 0 0;
  box-shadow: rgb(0 0 0 / 35%) 5px 0px 15px;
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '1rem',
        }}
      >
        <input
          type='search'
          value={context.search}
          onChange={(e) => context.setSearch(e.target.value)}
        />
      </div>
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
