import React, { useState, useEffect, useContext } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useLocation } from 'react-router';
import axios from 'axios';
import PlaylistItem from './PlaylistItem';
import AppContext from '../../context/AppContext';
import styled from '@emotion/styled';

const PlaylistContainer = styled.div((props) => ({
  backgroundColor: '#f1f1f1',
  borderRadius: '0 10px 10px 0',
  margin: 0,
  width: '22rem',
  boxShadow: props.open ? 'rgba(0, 0, 0, 0.35) 0px 5px 15px' : 'none',
  color: '#000',
  position: 'fixed',
  top: '15%',
  left: 0,
  transition: '500ms ease-in',
  transform: props.open ? '' : 'translateX(-100%)',
  zIndex: 1000,
}));

const Header = styled.h3`
  width: 100%;
  background-color: #2941ab;
  text-align: center;
  margin: 0;
  border-radius: 0 10px 0 0;
  padding: 0.5rem 0;
  color: #fff;
`;

const List = styled.ul`
  list-style: none;
  padding: 0.1rem 0.5rem;
  margin: 0;
  height: 27rem;
  overflow-y: scroll;
`;

const OpenPlaylistTab = styled.div`
  position: absolute;
  top: 46%;
  right: -53px;
  transform: rotate(90deg);
  background-color: #2941ab;
  color: #fff;
  z-index: -1;
  border-radius: 5px 5px 0 0;
  padding: 0.3rem;
  transition: 200ms ease-out;
  &:hover {
    cursor: pointer;
    background-color: #203282;
  }
`;

function Playlist() {
  const context = useContext(AppContext);
  const playlist = context.playlist;
  const [playlistOpen, setPlaylistOpen] = useState(false);

  const toggleOpenPlaylist = () => {
    setPlaylistOpen((prev) => !prev);
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const songs = [...playlist];
    const [draggedItem] = songs.splice(result.source.index, 1);
    songs.splice(result.destination.index, 0, draggedItem);

    context.setPlaylist(songs);
  }

  return (
    <PlaylistContainer open={playlistOpen}>
      <Header>My Playlist</Header>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='songs'>
          {(provided) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {playlist.map((song, index) => (
                <Draggable key={song.uri} draggableId={song.uri} index={index}>
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <PlaylistItem song={song} index={index} />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
      <OpenPlaylistTab onClick={toggleOpenPlaylist}>PLAYLIST</OpenPlaylistTab>
    </PlaylistContainer>
  );
}

export default Playlist;
