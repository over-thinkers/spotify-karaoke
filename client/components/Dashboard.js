import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';
import useAuth from './useAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import SearchResultTrack from './SearchResultTrack';
import AudioPlayer from './AudioPlayer';
import SpotifyPlayer from 'react-spotify-web-playback';
import axios from 'axios';
import AppContext from '../../context/AppContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from '@emotion/styled';

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 7rem;
`;

const Title = styled.h1`
  font-size: 5rem;
  font-weight: bold;
  margin: 4rem 0 2rem 0;
  text-align: center;
`;

const InputContainer = styled.div`
  margin-bottom: 2rem;
`;

const Input = styled.input`
  border: #000 1px solid;
  border-radius: 50px;
  height: 50px;
  width: 250px;
  text-align: center;
  font-size: 1.1rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  &:focus {
    outline: 0;
  }
`;

const SearchResultsContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  justify-content: center;
`;

const Dashboard = ({ code, dashboardRef }) => {
  const context = useContext(AppContext);

  return (
    <SearchContainer ref={dashboardRef}>
      <Title>Looking for music?</Title>
      <InputContainer>
        <Input
          type='search'
          placeholder='Search by song or artist'
          value={context.search}
          onChange={(e) => context.setSearch(e.target.value)}
        />
      </InputContainer>
      <SearchResultsContainer>
        <InfiniteScroll
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
          dataLength={context.searchResults.length}
          next={context.nextPage}
          hasMore={context.hasMore}
          loader={context.search ? <h4>Loading...</h4> : null}
        >
          {context.searchResults.map((track) => (
            <SearchResultTrack track={track} key={track.uri} />
          ))}
        </InfiniteScroll>
      </SearchResultsContainer>
    </SearchContainer>
  );
};

export default Dashboard;
