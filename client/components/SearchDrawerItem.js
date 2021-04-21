import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';
import styled from '@emotion/styled';

const SongContainer = styled.div`
  display: flex;
  height: 3rem;
  position: relative;
  padding: 0.3rem;
  border-radius: 5px;
  &:hover {
    background-color: #fff;
    cursor: pointer;
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0 0.7rem;
  max-width: 70%;
`;

const Title = styled.h4`
  margin: 0;
  font-size: 0.9rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
`;

const Artist = styled.p`
  margin: 0;
  font-size: 0.8rem;
`;

const Image = styled.img`
  object-fit: contain;
`;

const SearchDrawerItem = ({ track }) => {
  const context = useContext(AppContext);

  return (
    <SongContainer
      onClick={() => {
        context.addToPlaylist(track);
      }}
    >
      <Image src={track.albumUrl} />

      <TextContainer>
        <Title>{track.title}</Title>
        <Artist>{track.artist}</Artist>
      </TextContainer>
    </SongContainer>
  );
};

export default SearchDrawerItem;