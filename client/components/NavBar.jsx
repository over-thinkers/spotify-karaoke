import React from 'react';
import ReactDOM from 'react-dom'
import { MdLibraryMusic } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

function NavBar() {
  return (
    <div>
      <navbar class="navbar">
        <ul class="nav-list">
          <li class="nav-item">
            <div class="logoName">
              <div class="logo">
                <a href="#"><img src="https://ez-drum-kit.s3-us-west-1.amazonaws.com/chat.png" width="42px"/></a>
              </div>
              <div class="name">
                <p>Spoti-oki</p>
              </div>
            </div>
          </li>
          {/* <li class="nav-item">
            <a href="#">SPOTI-OKI</a>
          </li> */}
          <li class="nav-item">
            <a href="#">Home</a>
          </li>
          <li class="nav-item">
            <a href="#">Support</a>
          </li>
          {/* <li class="nav-item">
            <a href="#">My Playlist</a>
          </li> */}
          <li class="nav-item">
            <p class="line"></p>
          </li>
          {/* <li class="nav-item">
            <a href="#"><FaRegUserCircle size={30}/></a>
          </li> */}
          <li class="nav-item">
            <a href="#">Log In</a>
          </li>
        </ul>
      </navbar>
    </div>
  )
}

export default NavBar