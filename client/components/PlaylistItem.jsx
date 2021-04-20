import axios from 'axios';
import React, { useContext } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import SongContext from '../../context/SongContext';
import styled from '@emotion/styled';

const SongContainer = styled.div((props) => ({
  display: 'flex',
  height: '3.5rem',
  marginTop: '0.2rem',
  position: 'relative',
  padding: '0.3rem',
  borderRadius: '5px',
  boxShadow: props.playing && 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  backgroundColor: props.playing && '#fff',
}));

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0 1rem;
  max-width: 70%;
`;

const Title = styled.h4`
  margin: 0;
  font-size: 1rem;
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

const TrashCan = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 23px;
  right: 10px;

  &:hover {
    cursor: pointer;
  }
`;

function PlaylistItem({ song, index }) {
  const context = useContext(SongContext);

  const selectPlaylistTrack = (i) => {
    context.setPlaylistIdx(i);
  };

  const isPlaying = () => {
    if (!context.currentSong) return;
    return context.currentSong.uri === song.uri;
  };

  return (
    <SongContainer playing={isPlaying()}>
      <Image
        src={song.albumUrl}
        onClick={() => {
          selectPlaylistTrack(index);
        }}
      />

      <TextContainer
        onClick={() => {
          selectPlaylistTrack(index);
        }}
      >
        <Title>{song.title}</Title>
        <Artist>{song.artist}</Artist>
      </TextContainer>

      <TrashCan
        onClick={() => {
          context.deleteSong(index);
        }}
      >
        <AiOutlineDelete size={20} />
      </TrashCan>
    </SongContainer>
  );
}

export default PlaylistItem;
