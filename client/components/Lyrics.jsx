import React, { useState, useEffect } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import { useLocation} from "react-router";
import axios from 'axios'

function Lyrics() {
    let [currentSong, setCurrentSong] = useState([])
    let location = useLocation();
    currentSong = location.state
    const [lyrics, setLyrics] = useState('')

    useEffect(() => {
        if(!currentSong) return
        axios.get('http://localhost:3000/lyrics', {
            params: {
                track: currentSong.title,
                artist: currentSong.artist,
            }
        })
        .then((res) => {
            setLyrics(res.data.lyrics)
        })
    }, [currentSong])

  return (
    <>
        <div className="lyricContainer">
            <div classNmame="lyricTitle">
                <h1>{currentSong.title} by</h1>
            </div>
            <div className="lyricArtist">
                <h1>{currentSong.artist}</h1>
            </div>
            <div className="lyricLyrics">
                <p>{lyrics}</p>
            </div>
        </div>
    </>
  )
}

export default Lyrics
