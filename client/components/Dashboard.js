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
import SongContext from '../../context/SongContext';
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
  margin: 3rem 0;
`

const InputContainer = styled.div`
  margin-bottom: 2rem;
`

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
`

const SearchResultsContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  justify-content: center;
`;

const spotifyApi = new SpotifyWebApi({
  clientId: 'dca3db4a5a914cae9632a6c5ebba47f0',
});

const Dashboard = ({ code }) => {
  const context = useContext(SongContext);
  const accessToken = useAuth(code);
  const [search, setSearch] = useState('gryffin');
  const [searchResults, setSearchResults] = useState([]);
  const [delay, setDelay] = useState();

  const searchTracks = () => {
    spotifyApi.searchTracks(search, { limit: 20, offset: 0 }).then((res) => {
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestImage = track.album.images.reduce(
            (smallest, current) => {
              if (current.height < smallest.height) return current;
              return smallest;
            }
          );

          const largestImage = track.album.images[0];

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: largestImage.url,
          };
        })
      );
    });
  };

  const userInfo = () => {
    axios
      .get(`https://api.spotify.com/v1/me?access_token=${accessToken}`)
      .then((res) => {
        context.setUserEmail(res.data.email);
      });
  };

  useEffect(() => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
      userInfo();

      spotifyApi.getMyDevices().then((data) => console.log(data.body.devices));
    }
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    if (delay) clearTimeout(delay);

    setDelay(
      setTimeout(() => {
        searchTracks();
      }, 300)
    );
  }, [search, accessToken]);

  return (
    <SearchContainer>
      <Title>Looking for music?</Title>
      <InputContainer>
        <Input
          type='search'
          placeholder='Search by song or artist'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputContainer>
      <SearchResultsContainer>
        {searchResults.map((track) => (
          <SearchResultTrack track={track} key={track.uri} />
        ))}
      </SearchResultsContainer>
      <AudioPlayer accessToken={accessToken} />
    </SearchContainer>
  );
};

export default Dashboard;
