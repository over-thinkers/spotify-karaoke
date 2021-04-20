import React, { useState, useEffect, useContext } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useLocation } from 'react-router';
import axios from 'axios';
import PlaylistItem from './PlaylistItem';
import SongContext from '../../context/SongContext';
import styled from '@emotion/styled';

const Section = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const PlaylistContainer = styled.div`
  background-color: #f1f1f1;
  border-radius: 10px;
  margin: 1rem;
  width: 30rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const Header = styled.h1`
  width: 100%;
  background-color: #2941ab;
  text-align: center;
  margin: 0;
  border-radius: 10px 10px 0 0;
  padding: 0.5rem 0;
  color: #fff;
`;

const List = styled.ul`
  list-style: none;
  padding: 0.1rem 0.5rem;
  margin: 0;
  min-height: 5rem;
  max-height: 20rem;
  overflow-y: scroll;
`;

function Playlist() {
  const context = useContext(SongContext);
  const playlist = context.playlist;

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const songs = [...playlist];
    const [draggedItem] = songs.splice(result.source.index, 1);
    songs.splice(result.destination.index, 0, draggedItem);

    context.setPlaylist(songs);
  }

  return (
    <Section>
      <PlaylistContainer>
        <Header>My Playlist</Header>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='songs'>
            {(provided) => (
              <List {...provided.droppableProps} ref={provided.innerRef}>
                {playlist.map((song, index) => (
                  <Draggable
                    key={song.uri}
                    draggableId={song.uri}
                    index={index}
                  >
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
      </PlaylistContainer>
    </Section>
  );
}

export default Playlist;
