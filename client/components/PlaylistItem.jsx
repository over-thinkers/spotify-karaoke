import axios from 'axios';
import React, { useContext } from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import SongContext from '../../context/SongContext'

function PlaylistItem({ song, userEmail, refreshList, changeSong, index }) {
  const context = useContext(SongContext);

  const selectPlaylistTrack = (i) => {
    context.setPlaylistIdx(i);
  }

  let removeSong = () => {
    axios.put('http://localhost:3000/removesong', { userEmail, songTitle: song.title})
      .then( refreshList())
      .catch((err) => {console.log('error at remove', err)})
  }

  return (
    <>
        <div className="playlistSongList">
          <div className="playlistTitle">
            <p className="deleteIcon" onClick={()=>{context.deleteSong(index)}}>
              <AiOutlineDelete size={12}/>
            </p>
          </div>
          <div className="playlistTitle">
            <p
              className="playSong songTitle"
              onClick={() => {
                // changeSong(song.albumUrl, song.artist, song.title, userEmail);
                selectPlaylistTrack(index)
              }}
            >
              {`${song.title}` }
            </p>
          </div>

          <div className="playlistAritst">
            <p className="playSong" onClick={()=>alert('make song play when clicked')}>{`  by ${song.artist} `}</p>
          </div>

          <div className="playlistAlubum">
            <img className="playlistImg playSong" src={song.albumUrl} onClick={()=>alert('make song play when clicked')}/>
          </div>
        </div>
    </>
  )
}

export default PlaylistItem
