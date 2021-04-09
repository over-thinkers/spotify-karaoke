import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import { useLocation} from "react-router";

function Playlist() {
    let [currentSong, setCurrentSong] = useState([])
    let location = useLocation();
    currentSong = location.state

  return (
    <>
        <div className="playlistContainer">
            <div classNmame="playlistTitle">
                <h1>{currentSong.title} by</h1>
            </div>
            <div className="playlistArtist">
                <h1>{currentSong.artist}</h1>
            </div>
        </div>
    </>
  )
}

export default Playlist
