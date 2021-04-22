import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';
import { AiOutlinePlus } from 'react-icons/ai';
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
`;

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

const Plus = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 16px;
  right: 8px;

  &:hover {
    cursor: pointer;
    color: #2941ab;
  }
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
      <Plus>
        <AiOutlinePlus size={25} />
      </Plus>
    </SongContainer>
  );
};

export default SearchDrawerItem;
