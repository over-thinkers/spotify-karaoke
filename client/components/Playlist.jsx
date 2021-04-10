import React, { useState, useEffect } from 'react';
import { useLocation} from "react-router";
import axios from 'axios'
import PlaylistItems from './PlaylistItems'

function Playlist() {
    const [playlist, setPlaylist] = useState([
        {artist: "Gryffin", title: "Feel Good (feat. Daya)", albumUrl: "https://i.scdn.co/image/ab67616d0000b2736362397987db1fbf17f3d9b5"},
        {artist: "Gryffin", title: "I Want Love (with Two Feet)", albumUrl: "https://i.scdn.co/image/ab67616d0000b27327942224c75fa4f0718f1b19"},
        {artist: "Gryffin", title: "Body Back (feat. Maia Wright)", albumUrl: "https://i.scdn.co/image/ab67616d0000b273a2c3c702bdb4ad9ed5789fe5"},
        {artist: "Gryffin", title: "All You Need To Know (feat. Calle Lehmann)", albumUrl: "https://i.scdn.co/image/ab67616d0000b27344fa3ab08e3c6e74c1960081"},
        {artist: "Gryffin", title: "Body Back (feat. Maia Wright)", albumUrl: "https://i.scdn.co/image/ab67616d0000b273a2c3c702bdb4ad9ed5789fe5"},
        {artist: "Gryffin", title: "All You Need To Know (feat. Calle Lehmann)", albumUrl: "https://i.scdn.co/image/ab67616d0000b27344fa3ab08e3c6e74c1960081"},
    ])
    // const [user, setUser] = useState('')
    let [currentSong, setCurrentSong] = useState([])
    let location = useLocation();
    currentSong = location.state
    // console.log("song data", location.state)

    // playlist.push(location.state)

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
            <div className="playlistHeader"><h1 className="playlistH1">My Playlist</h1></div>
            <div className="playlistBox">
                {/* <h1 className="playlistH1">My Playlist</h1> */}
           {playlist.map((songs, index) => {
            //    <div className="playlistSongList">
               return <PlaylistItems songs={songs} key={index}/>
            //    </div>
           })}
           </div>
        </div>
    </>
  )
}

export default Playlist
