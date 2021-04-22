import React, { useState, useEffect, useContext } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useLocation } from 'react-router';
import axios from 'axios';
import PlaylistItem from './PlaylistItem';
import SongContext from '../../context/SongContext';

function Playlist() {
  const context = useContext(SongContext);
  const playlist = context.playlist;

  function handleOnDragEnd(result) {
    const songs = [...playlist];
    const [draggedItem] = songs.splice(result.source.index, 1);
    songs.splice(result.destination.index, 0, draggedItem);

    context.setPlaylist(songs);
  }

  return (
    <div className='playlistContainer'>
      <div className='playlistHeader'>
        <h1 className='playlistH1'>My Playlist</h1>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='songs'>
          {(provided) => (
            <ul
              className='playlistBox'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
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
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Playlist;
