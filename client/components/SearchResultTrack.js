import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import styled from '@emotion/styled';

const SongContainer = styled.li`
  list-style: none;
  width: 20rem;
  margin: 0.4rem;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`;

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
`;

const OverlayText = styled.div`
  width: 100%;
  color: #000;
  font-size: 20px;
  font-weight: 700;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;

  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.primary};

    &:hover {
      text-decoration: underline;
    }
  }
`;

const AlbumCover = styled.img`
  display: block;
  width: 100%;
  height: auto;
  transition: 500ms ease-out;
`;

const Title = styled.h4`
  white-space: nowrap;
  overflow: hidden;
  width: 90%;
  text-overflow: ellipsis;
  margin: 0.5rem auto 0 auto;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 20rem;
  width: 20rem;
  &:hover {
    ${Overlay} {
      opacity: 1;
    }
    ${AlbumCover} {
      opacity: 0.2;
    }
  }
`;

const SearchResultTrack = ({ track }) => {
  const context = useContext(AppContext);
  const [overlayText, setOverlayText] = useState('+ Add to playlist');

  const { artist, title, uri, albumUrl } = track;

  return (
    <SongContainer
      onClick={() => {
        context.addToPlaylist(track);
        setOverlayText('Added!');
      }}
    >
      <ImageContainer>
        <AlbumCover src={albumUrl} />
        <Overlay>
          <OverlayText>
            {overlayText}
            <br />
            {overlayText === 'Added!' && (
              <Link to={{ pathname: 'playlist' }}>Go to playlist</Link>
            )}
          </OverlayText>
        </Overlay>
      </ImageContainer>

      <Title>{title}</Title>
      <div>{artist}</div>
    </SongContainer>
  );
};

export default SearchResultTrack;
