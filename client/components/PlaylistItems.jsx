import axios from 'axios';
import React from 'react';
import { AiOutlineDelete } from "react-icons/ai";

function PlaylistItems({ songs, userEmail }) {
  let removeSong = () => {
    axios.put('http://localhost:3000/removesong', { userEmail, songTitle: songs.title})
      .then((res) => {console.log('response', res.data)})
      .catch((err) => {console.log('error at remove', err)})
  }

  return (
    <>
        <div className="playlistSongList">
        <div className="playlistTitle">
            <p className="deleteIcon" onClick={()=>{removeSong()}}><AiOutlineDelete size={12}/></p>
          </div>
          <div className="playlistTitle">
            <p className="playSong songTitle" onClick={()=>alert('make song play when clicked')}>{`${songs.title}` }</p>
          </div>

          <div className="playlistAritst">
            <p className="playSong" onClick={()=>alert('make song play when clicked')}>{`  by ${songs.artist} `}</p>
          </div>

          <div className="playlistAlubum">
            <img className="playlistImg playSong" src={songs.albumUrl} onClick={()=>alert('make song play when clicked')}/>
          </div>
        </div>
    </>
  )
}

export default PlaylistItems
