import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SongContext from '../../context/SongContext';
import styled from '@emotion/styled';

const SongContainer = styled.li`
  list-style: none;
  width: 20rem;
  margin: 0.4rem;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: 500ms ease-out;
`

const OverlayText = styled.div`
  color: #000;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
`

const AlbumCover = styled.img`
  display: block;
  width: 100%;
  height: auto;
  transition: 500ms ease-out;
`

const Title = styled.h4`
  white-space: nowrap;
  overflow: hidden;
  width: 90%;
  text-overflow: ellipsis;
  margin: 0.5rem auto 0 auto;
`

const ImageContainer = styled.div`
  position: relative;
  height: 20rem;
  width: 20rem;
  &:hover {
    ${Overlay} {
      opacity: 1;
    }
    ${AlbumCover} {
      opacity: 0.3;
    }
  }
`

const SearchResultTrack = ({ track }) => {
  const context = useContext(SongContext);

  const { artist, title, uri, albumUrl } = track;

  return (
    <SongContainer 
      onClick={() => {
        context.addToPlaylist(track)
      }}
    >
      <ImageContainer>
        <AlbumCover src={albumUrl} />
        <Overlay>
          <OverlayText>
            + Add to playlist
          </OverlayText>
        </Overlay>
      </ImageContainer>

      <Title>{title}</Title>
      <div>{artist}</div>
    </SongContainer>
  )
}

export default SearchResultTrack
