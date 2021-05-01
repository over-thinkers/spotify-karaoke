import React, { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import SearchDrawerItem from './SearchDrawerItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from '@emotion/styled';

const ListContainer = styled.div((props) => ({
  backgroundColor: '#fff',
  margin: 0,
  padding: '0.5rem',
  boxShadow: props.open ? 'rgba(0, 0, 0, 0.35) 0px 5px 15px' : 'none',
  color: '#000',
  transition: '500ms ease-in',
  height: '100%',
  display: props.viewPlaylist ? 'none' : 'flex',
  flexDirection: 'column',
}));

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  height: 100%;
  overflow-y: scroll;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.5rem;
`;

const Input = styled.input`
  font-size: 1rem;
  text-align: center;
  border-radius: 15px;
  border: 1px solid black;
  padding: 0.3rem;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

const SearchDrawer = ({ viewPlaylist }) => {
  const context = useContext(AppContext);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleOpenSearch = () => {
    setSearchOpen((prev) => !prev);
  };

  return (
    <ListContainer viewPlaylist={viewPlaylist} open={searchOpen}>
      <InputContainer>
        <Input
          type='search'
          placeholder='song title or artist'
          value={context.search}
          onChange={(e) => context.setSearch(e.target.value)}
        />
      </InputContainer>
      <List id='searchResults'>
        <InfiniteScroll
          dataLength={context.searchResults.length}
          next={context.nextPage}
          hasMore={context.hasMore}
          loader={context.search ? <h4>Loading...</h4> : null}
          scrollableTarget='searchResults'
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>End of results</b>
            </p>
          }
        >
          {context.searchResults.map((track) => (
            <SearchDrawerItem track={track} key={track.uri} />
          ))}
        </InfiniteScroll>
      </List>
    </ListContainer>
  );
};

export default SearchDrawer;
