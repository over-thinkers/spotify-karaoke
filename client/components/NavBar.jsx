import React from 'react';
import ReactDOM from 'react-dom'
import { MdLibraryMusic } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

function NavBar() {
  const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=fe60e323d09f45e7bf069353680f5a1a&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-modify-public";

  return (
    <>
      <div>
        <ul className="nav-list">
          <li className="nav-item">
            <div className="logoName">
              <div className="logo">
                <a href="#"><img src="https://ez-drum-kit.s3-us-west-1.amazonaws.com/chat.png" width="42px"/></a>
              </div>
              <div className="name">
                <p>Spoti-oki</p>
              </div>
            </div>
          </li>
          <li className="nav-item">
            <a href="#">Home</a>
          </li>
          <li className="nav-item">
            <a href="#">About</a>
          </li>
          <li className="nav-item">
            <p className="line"></p>
          </li>
          <li className="nav-item">
            <a href={AUTH_URL}>Log In</a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default NavBar