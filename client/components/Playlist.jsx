import React, { useState, useEffect } from 'react';
import { useLocation} from "react-router";
import axios from 'axios'
import PlaylistItems from './PlaylistItems'

function Playlist() {
    const [playlist, setPlaylist] = useState([])
    const [user, setUser] = useState('')
    let [currentSong, setCurrentSong] = useState([])
    let location = useLocation();
    currentSong = location.state
    console.log(location.state)

    playlist.push(location.state)
    // playlist = location.state

    useEffect(() => {
        const artist = location.state.artist;
        const title = location.state.title;
        const albumUrl = location.state.albumUrl;
        axios.post('http://localhost:3000/postplaylist', {artist, title, albumUrl})
            .then((res) => {
                console.log("res data frmo client", res.data)
                // once posted run the get playlist method
            })
            .catch((err) => {
                console.log('error at playlist component', err)
            })
        // add new song to the playlist database
        // get playlist from database based on users email
    }, [currentSong])

    useEffect(() => {
        axios.get('http://localhost:3000/getplaylist', {
            params: {
                userEmail: 'hi@gmail.com'
            }
        })
            .then((res) => {
                console.log("res data from client", res.data)
                // once posted run the get playlist method
            })
            .catch((err) => {
                console.log('error at playlist component', err)
            })
        // get playlist from database based on users email
    }, [playlist])

  return (
    <>
        <div className="playlistContainer">
           {playlist.map((songs, index) => {
               return <PlaylistItems songs={songs} key={index}/>
           })}
        </div>
    </>
  )
}

export default Playlist
